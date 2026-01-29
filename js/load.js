const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

// Intro animation
tl.to(".loader-logo", {
  opacity: 1,
  scale: 1,
  duration: 1,
})
  .to(".loader-text", {
    opacity: 1,
    y: -4,
    duration: 0.8,
  }, "-=0.5")

  // Hold
  .to({}, { duration: 0.8 })

  // Exit animation
  .to(".loader-inner", {
    y: -80,
    opacity: 0,
    duration: 0.8,
    ease: "power2.in"
  })
  .to("#loader", {
    y: "-100%",
    duration: 1,
    ease: "expo.inOut"
  }, "-=0.4")

  // Reveal content
  .to("#content", {
    opacity: 1,
    duration: 0.8
  }, "-=0.6")

  // Cleanup
  .set("#loader", { display: "none" });
