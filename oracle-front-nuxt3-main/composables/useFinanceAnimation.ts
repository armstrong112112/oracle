interface FinanceRefs {
  finance: HTMLElement | null;
  financeLeft: HTMLElement | null;
  financeRight: HTMLElement | null;
  financeTitle: HTMLElement | null;
  financeText: HTMLElement | null;
  financeStatuses: HTMLElement | null;
  nextSteps: HTMLElement | null;
  nextStepsChildren: HTMLElement | null;
  financeRightImg: HTMLElement | null;
  borderElements?: HTMLElement[] | null;
}

interface AnimationContext {
  kill: () => void;
}

export function useFinanceAnimation(refs: FinanceRefs) {
  let ctx: AnimationContext | null = null;

  const setupAnimations = async (_scope: HTMLElement) => {
    if (ctx) {
      ctx.kill();
    }

    if (import.meta.client) {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (refs.financeTitle && refs.financeText) {
          gsap.from([refs.financeTitle, refs.financeText], {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: refs.financeTitle,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              refreshPriority: -1,
            },
          });
        }

        if (refs.financeStatuses) {
          const statusNodes = Array.from(
            refs.financeStatuses.querySelectorAll(".finance_status")
          );

          if (statusNodes.length > 0) {
            const statusTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: refs.financeStatuses,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                refreshPriority: -1,
              },
            });

            statusTimeline.from(statusNodes, {
              x: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
            });

            if (refs.borderElements && refs.borderElements.length > 0) {
              const validBorders = refs.borderElements.filter(
                (border) => border !== null
              );

              if (validBorders.length > 0) {
                validBorders.forEach((border) => {
                  gsap.set(border, {
                    height: "0px",
                    width: "0px",
                    display: "none",
                    overflow: "hidden",
                  });
                });

                statusTimeline.to(
                  validBorders,
                  {
                    height: "16px",
                    width: "36px",
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                    display: "flex",
                  },
                  "+=0.01"
                );
              }
            }
          }
        }

        if (refs.nextSteps && refs.nextStepsChildren) {
          const nextStepsTextNodes = Array.from(
            refs.nextStepsChildren.querySelectorAll(".next_steps_text")
          );

          if (nextStepsTextNodes.length > 0) {
            gsap.from([refs.nextSteps, ...nextStepsTextNodes], {
              yPercent: 100,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: refs.nextStepsChildren,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                refreshPriority: -1,
              },
            });
          }
        }

        if (refs.financeRightImg) {
          gsap.from(refs.financeRightImg, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: refs.financeRightImg,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              refreshPriority: -1,
            },
          });
        }
      });

      return ctx;
    }
  };

  const cleanup = () => {
    if (ctx) {
      ctx.kill();
      ctx = null;
    }
  };

  return { setupAnimations, cleanup };
}
