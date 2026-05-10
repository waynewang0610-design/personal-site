export default function VisitorMap() {
  return (
    <div className="retro-box mb-6 text-center">
      <div className="window-title">
        <span>🌍 Visitors Around the World</span>
        <span>🗙</span>
      </div>
      <div className="retro-inset flex justify-center py-2">
        {/* RevolverMaps free widget */}
        <iframe
          src="https://rf.revolvermaps.com/w/rf/rfImage.php?w=280&h=140&t=0&i=2hnautztz4r"
          width={280}
          height={140}
          title="Visitor Map"
          style={{ maxWidth: "100%", border: "2px inset #808080" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
