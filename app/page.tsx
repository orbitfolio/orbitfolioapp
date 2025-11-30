"use client";

import React, { useEffect, useMemo, useState } from "react";

type Market = "IN" | "US" | "CA";
type AssetType = "Stock" | "Mutual Fund" | "Crypto";

type Holding = {
  id: number;
  asset: string;
  type: AssetType;
  market: Market;
  quantity: number;
  avgBuy: number;
  current: number;
};

function formatCurrency(value: number, market: Market | "USD" = "IN") {
  const currency =
    market === "US" || market === "USD"
      ? "USD"
      : market === "CA"
      ? "CAD"
      : "INR";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(isFinite(value) ? value : 0);
}

type FxRates = {
  inrToUsd: number;
  cadToUsd: number;
};

export default function Page() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formAsset, setFormAsset] = useState("");
  const [formType, setFormType] = useState<AssetType>("Stock");
  const [formMarket, setFormMarket] = useState<Market>("IN");
  const [formQuantity, setFormQuantity] = useState("");
  const [formAvgBuy, setFormAvgBuy] = useState("");
  const [formError, setFormError] = useState("");

  const [idCounter, setIdCounter] = useState(1);

  const [fxRates, setFxRates] = useState<FxRates | null>(null);
  const [fxStatus, setFxStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");

  // Fetch FX rates (INR->USD and CAD->USD) every 30 minutes using Freecurrencyapi
  useEffect(() => {
    let cancelled = false;

    async function loadFx() {
      try {
        setFxStatus("loading");

        const API_KEY = "fca_live_sjHD1tO8YZJgDOwcu0QLrpDFsoOg80MEVJkNAzwn";
        const res = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=INR,CAD`
        );

        if (!res.ok) throw new Error("FX request failed");
        const data = await res.json();
        const usdToInr = data.data?.INR ?? 0;
        const usdToCad = data.data?.CAD ?? 0;
        if (!usdToInr || !usdToCad) throw new Error("Bad FX data");

        const inrToUsd = 1 / usdToInr;
        const cadToUsd = 1 / usdToCad;

        if (!cancelled) {
          setFxRates({ inrToUsd, cadToUsd });
          setFxStatus("ok");
        }
      } catch (e) {
        if (!cancelled) {
          setFxStatus("error");
        }
      }
    }

    loadFx();
    const id = setInterval(loadFx, 30 * 60 * 1000); // 30 minutes
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  function toUsd(valueLocal: number, market: Market): number {
    if (!fxRates) return NaN;
    if (market === "US") return valueLocal;
    if (market === "IN") return valueLocal * fxRates.inrToUsd;
    if (market === "CA") return valueLocal * fxRates.cadToUsd;
    return valueLocal;
  }

  const totals = useMemo(() => {
    let investedUsd = 0;
    let valueUsd = 0;
    let plUsd = 0;

    holdings.forEach((h) => {
      const invested = h.quantity * h.avgBuy;
      const value = h.quantity * h.current;
      const pl = value - invested;

      if (fxRates) {
        investedUsd += toUsd(invested, h.market);
        valueUsd += toUsd(value, h.market);
        plUsd += toUsd(pl, h.market);
      }
    });

    return {
      investedUsd: fxRates ? investedUsd : NaN,
      valueUsd: fxRates ? valueUsd : NaN,
      plUsd: fxRates ? plUsd : NaN,
    };
  }, [holdings, fxRates]);

  function resetForm() {
    setFormAsset("");
    setFormType("Stock");
    setFormMarket("IN");
    setFormQuantity("");
    setFormAvgBuy("");
    setFormError("");
  }

  function handleAddHolding() {
    setFormError("");

    const quantity = Number(formQuantity);
    const avgBuy = Number(formAvgBuy);

    if (!formAsset.trim()) {
      setFormError("Please enter asset name or symbol.");
      return;
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      setFormError("Quantity must be a positive number.");
      return;
    }
    if (!Number.isFinite(avgBuy) || avgBuy <= 0) {
      setFormError("Average buy price must be a positive number.");
      return;
    }

    const variation = 1 + (Math.random() * 0.01 - 0.005); // ±0.5%
    const current = Number((avgBuy * variation).toFixed(2));

    const next: Holding = {
      id: idCounter,
      asset: formAsset.trim(),
      type: formType,
      market: formMarket,
      quantity,
      avgBuy,
      current,
    };

    setIdCounter((n) => n + 1);
    setHoldings((prev) => [...prev, next]);
    resetForm();
    setShowModal(false);
  }

  function handleRemove(id: number) {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  }

  const fxLabel =
    fxStatus === "loading"
      ? "FX loading…"
      : fxStatus === "error"
      ? "FX error (totals may be blank)"
      : fxStatus === "ok"
      ? "FX updated (USD dashboard)"
      : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "40px 16px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        background:
          "radial-gradient(circle at top left, #1e293b 0, #020617 55%, #000000 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 32,
                margin: 0,
                marginBottom: 8,
              }}
            >
              Orbitfolio
            </h1>
            <p
              style={{
                margin: 0,
                color: "#cbd5f5",
                fontSize: 14,
                maxWidth: 460,
              }}
            >
              Holdings in native currencies (INR / USD / CAD). Top dashboard
              shows everything converted to USD using FX rates refreshed
              roughly every 30 minutes.
            </p>
            {fxLabel && (
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 11,
                  color:
                    fxStatus === "error"
                      ? "#f97316"
                      : fxStatus === "loading"
                      ? "#e5e7eb"
                      : "#22c55e",
                }}
              >
                {fxLabel}
              </p>
            )}
          </div>
          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(148, 163, 184, 0.4)",
              fontSize: 12,
              color: "#e5e7eb",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.35))",
            }}
          >
            MVP · Phase 1 · USD dashboard
          </div>
        </header>

        {/* USD Summary cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(56,189,248,0.15))",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginBottom: 4,
              }}
            >
              Total Value (USD)
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {formatCurrency(totals.valueUsd || 0, "USD")}
            </div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(129,140,248,0.2))",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginBottom: 4,
              }}
            >
              Day P&L (USD)
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color:
                  (totals.plUsd || 0) >= 0 ? "#22c55e" : "#f97316",
              }}
            >
              {formatCurrency(totals.plUsd || 0, "USD")}
            </div>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(248,250,252,0.04))",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginBottom: 4,
              }}
            >
              Total P&L (USD)
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color:
                  (totals.plUsd || 0) >= 0 ? "#e5e7eb" : "#f97316",
              }}
            >
              {formatCurrency(totals.plUsd || 0, "USD")}
            </div>
          </div>
        </section>

        {/* Holdings table */}
        <section
          style={{
            background: "rgba(15,23,42,0.9)",
            borderRadius: 16,
            border: "1px solid rgba(148,163,184,0.4)",
            padding: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              gap: 12,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                }}
              >
                Holdings
              </h2>
              <p
                style={{
                  margin: 0,
                  marginTop: 4,
                  fontSize: 12,
                  color: "#9ca3af",
                }}
              >
                Table stays in native currency. Dashboard converts to USD
                using FX.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "none",
                fontSize: 13,
                fontWeight: 500,
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add holding
            </button>
          </div>

          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
                minWidth: 640,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "rgba(15,23,42,0.95)",
                  }}
                >
                  {[
                    "Asset",
                    "Type",
                    "Market",
                    "Quantity",
                    "Avg Buy",
                    "Current",
                    "Invested",
                    "Value",
                    "P&L",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "10px 8px",
                        borderBottom: "1px solid rgba(51,65,85,0.8)",
                        color: "#9ca3af",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {holdings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      style={{
                        textAlign: "center",
                        padding: "24px 8px",
                        color: "#6b7280",
                      }}
                    >
                      No holdings yet. Use “Add holding” to try out the
                      workflow.
                    </td>
                  </tr>
                ) : (
                  holdings.map((h) => {
                    const invested = h.quantity * h.avgBuy;
                    const value = h.quantity * h.current;
                    const pl = value - invested;
                    return (
                      <tr key={h.id}>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          {h.asset}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                            color: "#cbd5f5",
                          }}
                        >
                          {h.type}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                            color: "#94a3b8",
                          }}
                        >
                          {h.market === "IN"
                            ? "India (INR)"
                            : h.market === "US"
                            ? "US (USD)"
                            : "Canada (CAD)"}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          {h.quantity}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          {formatCurrency(h.avgBuy, h.market)}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          {formatCurrency(h.current, h.market)}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          {formatCurrency(invested, h.market)}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          {formatCurrency(value, h.market)}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                            color: pl >= 0 ? "#22c55e" : "#f97316",
                          }}
                        >
                          {formatCurrency(pl, h.market)}
                        </td>
                        <td
                          style={{
                            padding: "10px 8px",
                            borderBottom:
                              "1px solid rgba(30,41,59,0.9)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleRemove(h.id)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 999,
                              border: "none",
                              fontSize: 11,
                              background: "rgba(248,113,113,0.15)",
                              color: "#fca5a5",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,23,42,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 40,
              padding: 16,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                background: "#020617",
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.5)",
                padding: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: 12,
                  fontSize: 18,
                }}
              >
                Add holding
              </h3>
              <p
                style={{
                  margin: 0,
                  marginBottom: 16,
                  fontSize: 12,
                  color: "#9ca3af",
                }}
              >
                Data is stored locally in your browser for now. FX is only
                used for the USD dashboard totals.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <label style={{ fontSize: 12 }}>
                  <div style={{ marginBottom: 4 }}>Asset</div>
                  <input
                    value={formAsset}
                    onChange={(e) => setFormAsset(e.target.value)}
                    placeholder="TCS, NIFTYBEES, BTC…"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid rgba(51,65,85,0.9)",
                      background: "#020617",
                      color: "white",
                      fontSize: 13,
                    }}
                  />
                </label>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 8,
                  }}
                >
                  <label style={{ fontSize: 12 }}>
                    <div style={{ marginBottom: 4 }}>Type</div>
                    <select
                      value={formType}
                      onChange={(e) =>
                        setFormType(e.target.value as AssetType)
                      }
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(51,65,85,0.9)",
                        background: "#020617",
                        color: "white",
                        fontSize: 13,
                      }}
                    >
                      <option value="Stock">Stock</option>
                      <option value="Mutual Fund">Mutual Fund</option>
                      <option value="Crypto">Crypto</option>
                    </select>
                  </label>

                  <label style={{ fontSize: 12 }}>
                    <div style={{ marginBottom: 4 }}>Market</div>
                    <select
                      value={formMarket}
                      onChange={(e) =>
                        setFormMarket(e.target.value as Market)
                      }
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(51,65,85,0.9)",
                        background: "#020617",
                        color: "white",
                        fontSize: 13,
                      }}
                    >
                      <option value="IN">India (INR)</option>
                      <option value="US">US (USD)</option>
                      <option value="CA">Canada (CAD)</option>
                    </select>
                  </label>

                  <label style={{ fontSize: 12 }}>
                    <div style={{ marginBottom: 4 }}>Quantity</div>
                    <input
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(e.target.value)}
                      placeholder="10"
                      inputMode="decimal"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(51,65,85,0.9)",
                        background: "#020617",
                        color: "white",
                        fontSize: 13,
                      }}
                    />
                  </label>
                </div>

                <label style={{ fontSize: 12 }}>
                  <div style={{ marginBottom: 4 }}>Average buy price</div>
                  <input
                    value={formAvgBuy}
                    onChange={(e) => setFormAvgBuy(e.target.value)}
                    placeholder="100.00"
                    inputMode="decimal"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid rgba(51,65,85,0.9)",
                      background: "#020617",
                      color: "white",
                      fontSize: 13,
                    }}
                  />
                </label>
              </div>

              {formError && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#fca5a5",
                    marginBottom: 10,
                  }}
                >
                  {formError}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(51,65,85,0.9)",
                    background: "transparent",
                    color: "#e5e7eb",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddHolding}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    background:
                      "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Save holding
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
