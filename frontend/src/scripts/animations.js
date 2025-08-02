// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
var trigger;
var smoother;

function init() {

    createScroll();
    //anchorLinks();
    //navbarTransition(0);

    function createScroll() {
        // create the scrollSmoother before your scrollTriggers
        smoother = ScrollSmoother.create({
            smooth: 0.75, // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true, // looks for data-speed and data-lag attributes on elements
            smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
            
        });


        trigger = ScrollTrigger.create({
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                navbarTransition(self.progress.toFixed(3));
                /*
                console.log(
                    'progress:',
                    self.progress.toFixed(3),
                    'direction:',
                    self.direction,
                    'velocity',
                    self.getVelocity()
                );
                */
            }
        });

        
    }

    function navbarTransition(scrollTop) {
        const navbar = document.getElementById("navbar");
        // console.log(scrollTop);
        if (scrollTop > 0.01) {
            navbar.classList.add("scrolledDown");
        }
        else {
            navbar.classList.remove("scrolledDown");
        }
    }

    

    

    function anchorLinks() {
        gsap.utils.toArray(".nav-link").forEach(function (button, i) {
            button.addEventListener("click", (e) => {
                var id = e.target.getAttribute("href");
                console.log(id);
                smoother.scrollTo(id, true, "top top");
                e.preventDefault();
            });
        });
        
        var btn = document.getElementById("view-portfolio");
        btn.addEventListener("click", (e) => {
            var id = e.target.getAttribute("href");
            console.log(id);
            smoother.scrollTo(id, true, "top top");
            e.preventDefault();
        });
          
    }

    function animateCompanies() {
        if (document.getElementsByClassName("companies")[0] == null) {
            return;
        }

        // Animate the companies!
        // Get the company list itself.
        const items = document.getElementsByClassName("company-list")[0];

        if (items == null) return;

        // Number of duplicates. This will always be 3.
        const numDuplicates = 3;

        // Number of companies in the list.
        const numItems = items.childElementCount / numDuplicates;

        // The number of seconds it takes for each company image to scroll by.
        const singleElementScroll = 5;

        // The time it takes for animation to reach its end.
        const duration = numItems * singleElementScroll;

        // Starting percentage of animation x-shift.
        let start = 0;

        // Ending percentage of animation x-shift.
        let finish = -100 / numDuplicates;

        gsap.set(".company-list", {
            xPercent: start,
        });

        let tween = gsap.to(".company-list", {
            xPercent: finish,
            repeat: -1,
            duration: duration,
            ease: "none",
        });

        window.addEventListener("scroll", function(){

            gsap.to(tween, {
                timeScale: true,
            });
        });
    }
}



init();
document.addEventListener("astro:after-swap", init);