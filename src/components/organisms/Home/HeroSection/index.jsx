import styles from "./style.module.css";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
	const textRef = useRef(null);
	const triggerRef = useRef(null);

	useEffect(() => {
		const text = "An interactive page where you can explore the " +
			"legendary characters of Star Wars, powered by the SWAPI API";

		textRef.current.innerHTML = text
			.split("")
			.map((char) => `<span>${char}</span>`)
			.join("");


		const letters = textRef.current.querySelectorAll("span");

		gsap.set(letters, {
			color: "#ADD8E6",
		});

		const animation = gsap.to(letters, {
			scrollTrigger: {
				trigger: textRef.current,
				start: () => `top ${textRef.current.offsetTop}px`,
				end: () => `bottom ${textRef.current.offsetTop + 50}px`,
				scrub: true,
				pin: false,
			},
			color: "#FFD700",
			stagger: 0.8,
			duration: 1,
		});

		return () => {
			if (animation.scrollTrigger) {
				animation.scrollTrigger.kill();
			}
			animation.kill();
		};
	}, []);

	return(
		<section ref={triggerRef}>
			<h1 className={styles.page_heading} ref={textRef}></h1>
		</section>
	);
};

export default HeroSection;