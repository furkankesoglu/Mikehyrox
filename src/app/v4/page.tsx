import MikeCoachSystem from "../../components/MikeCoachSystem";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function V4Page() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 9999,
          padding: "8px 12px",
          borderRadius: 10,
          background: "#ff5a1f",
          color: "#090b0d",
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: ".08em",
        }}
      >
        MIKE V4 TEST ROUTE
      </div>
      <MikeCoachSystem />
    </>
  );
}
