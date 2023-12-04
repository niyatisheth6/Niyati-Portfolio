"use client";

import React from "react";

import { motion } from "framer-motion";

import SectionHeading from "./SectionHeading";
import SubmitBtn from "./SubmitBtn";
import { UseSectionView } from "@/lib/hooks";

export default function Contact() {
  const { ref } = UseSectionView("Projects");
  return (
    <motion.section
      ref={ref}
      id="contact"
      className="contact"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading title="Contact me" />

      <p className="contact_description">
        Please contact me directly at{" "}
        <a href="mailto:example@gmail.com">example@gmail.com</a> or through this
        form.
      </p>

      <form className="contact_form">
        <input
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
