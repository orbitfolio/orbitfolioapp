"use client";

import React from "react";

export default function Page() {
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
            marginBottom: 32,
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
                maxWidth: 420,
              }}
            >
              Unified portfolio dashboard for stocks, mutual funds and crypto.
              This is your first screen; holdings table and add/edit will come
              next.
            </p>
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
            MVP · Phase 1
          </div>
        </header>

        {/* Summary cards placeholder */}
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
              Total Value
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              ₹0.00
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
              Day P&L
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#22c55e",
              }}
            >
              ₹0.00
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
              Total P&L
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#e5e7eb",
              }}
            >
              ₹0.00
            </div>
          </div>
        </section>

        {/* Holdings table skeleton */}
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
                Next step: add / edit / remove holdings, fetch prices, and save
                to Supabase.
              </p>
            </div>
            <button
              type="button"
              disabled
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "none",
                fontSize: 13,
                fontWeight: 500,
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
                color: "white",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              Add holding (coming soon)
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
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      textAlign: "center",
                      padding: "24px 8px",
                      color: "#6b7280",
                    }}
                  >
                    No holdings yet. In the next step this table will show your
                    stocks, mutual funds, and crypto across markets.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
