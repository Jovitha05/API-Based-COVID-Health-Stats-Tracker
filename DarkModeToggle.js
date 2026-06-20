function DarkModeToggle({
  darkMode,
  setDarkMode
}) {
  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
    >
      {darkMode
        ? "☀ Light Mode"
        : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;