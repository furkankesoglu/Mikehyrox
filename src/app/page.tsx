import MikeCoachSystem from "@/components/MikeCoachSystem";

export default function Home() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 9999,
          padding: "7px 10px",
          borderRadius: 10,
          background: "#ff5a1f",
          color: "#090b0d",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: ".08em",
        }}
      >
        MIKE v4 · KURAL MOTORU
      </div>
      <MikeCoachSystem />
    </>
  );
}
