export async function showBackground (background) {
  const hero = document.getElementById('hero-main')
  hero.style.backgroundImage = `url("${background}")`
}
