const CrescentMoon = () => (
  <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 0 }}>
    <div style={{ position: 'relative', width: 36, height: 36 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(230,241,251,0.15)',
          position: 'absolute',
        }}
      />
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: '#112240',
          position: 'absolute',
          top: 2,
          left: -6,
        }}
      />
    </div>
  </div>
);

export default CrescentMoon;
