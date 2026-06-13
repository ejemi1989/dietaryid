"use client";

import { useState } from "react";
import Link from "next/link";

export function Hero() {
  const [chatInput, setChatInput] = useState("");

  return (
    <header className="text-center py-[70px] pb-[30px] relative">
      <h1 className="text-[clamp(36px,5.6vw,62px)] font-extrabold leading-[1.12] text-[var(--color-navy)] tracking-[-1.5px]">
        Eat normally.<br />Find safely.
      </h1>
      <p className="max-w-[520px] mx-auto mt-[22px] text-[var(--color-muted)] text-[16px] leading-[1.6]">
        Discover allergy-safe restaurants and dishes verified by people like you. Eat out with confidence, connect with your community, and never second-guess a menu again.
      </p>

      <div className="relative max-w-[920px] mx-auto mt-[50px] min-h-[480px]">
        {/* fc-1: 98% */}
        <div className="absolute top-[30px] left-[2%] z-4 bg-[var(--color-fc-bg)] rounded-[18px] shadow-[var(--shadow-float)] px-[18px] py-4 w-[225px] -rotate-[7deg]">
          <div className="w-[34px] h-[34px] rounded-full bg-[#fdeae0] flex items-center justify-center text-[16px] mb-2">🥗</div>
          <div className="text-[24px] font-extrabold text-[var(--color-navy)]">98%</div>
          <div className="text-[11.5px] text-[var(--color-muted)] mt-[3px] leading-[1.4]">Safe match accuracy on verified dishes</div>
        </div>

        {/* fc-2: 12,480 */}
        <div className="absolute top-[140px] left-[6%] z-4 bg-[var(--color-fc-bg)] rounded-[18px] shadow-[var(--shadow-float)] px-[18px] py-4 w-[210px] -rotate-[4deg]">
          <div className="w-[34px] h-[34px] rounded-full bg-[#e6ecfd] flex items-center justify-center text-[16px] mb-2"></div>
          <div className="text-[24px] font-extrabold text-[var(--color-navy)]">12,480</div>
          <div className="text-[11.5px] text-[var(--color-muted)] mt-[3px] leading-[1.4]">Allergy-verified restaurants near you</div>
        </div>

        {/* fc-3: +5.9% */}
        <div className="absolute bottom-[40px] left-[9%] z-4 bg-[var(--color-fc-bg)] rounded-[18px] shadow-[var(--shadow-float)] px-[18px] py-4 w-[215px] -rotate-[6deg]">
          <div className="w-[34px] h-[34px] rounded-full bg-[#dff4ee] flex items-center justify-center text-[16px] mb-2">💬</div>
          <div className="text-[24px] font-extrabold text-[var(--color-navy)]">+5.9% ↑</div>
          <div className="text-[11.5px] text-[var(--color-muted)] mt-[3px] leading-[1.4]">Community reviews this week (2,134 new)</div>
        </div>

        {/* fc-4: Safe Dishes Found */}
        <div className="absolute top-[15px] right-[4%] z-4 bg-[var(--color-fc-bg)] rounded-[18px] shadow-[var(--shadow-float)] px-[18px] py-4 w-[200px] rotate-[6deg]">
          <div className="text-[13px] font-bold text-[var(--color-navy)]">Safe Dishes Found</div>
          <div className="text-[24px] font-extrabold text-[var(--color-navy)] mt-[6px]">4,682</div>
          <div className="text-[11.5px] text-[var(--color-muted)] mt-[3px] leading-[1.4]">gluten-free · nut-free · dairy-free</div>
        </div>

        {/* fc-5: Average Safety Score */}
        <div className="absolute bottom-[55px] right-[6%] z-4 bg-[var(--color-fc-bg)] rounded-[18px] shadow-[var(--shadow-float)] px-[18px] py-4 w-[215px] rotate-[5deg]">
          <div className="text-[13px] font-bold text-[var(--color-navy)] text-center">Average Safety Score</div>
          <div className="w-[84px] h-[84px] rounded-full mx-auto mt-2 bg-[conic-gradient(#ff8a5c_0_88%,#f2e4e8_88%_100%)] flex items-center justify-center">
            <div className="w-[64px] h-[64px] rounded-full bg-[var(--color-fc-bg)] flex flex-col items-center justify-center">
              <b className="text-[17px] text-[var(--color-navy)]">88%</b>
              <small className="text-[8.5px] text-[var(--color-muted)]">Target: 93</small>
            </div>
          </div>
          <div className="text-[11.5px] text-[var(--color-muted)] mt-[3px] text-center leading-[1.4]">↑ 2.4% from last month</div>
        </div>

        {/* chat card */}
        <div className="relative z-5 max-w-[380px] mx-auto bg-[var(--color-chat-bg)] rounded-[24px] shadow-[var(--shadow-chat)] px-[22px] pt-[22px] pb-[26px] text-center">
          <div className="flex items-center justify-between text-[var(--color-navy-soft)] font-semibold text-[15px]">
            <span className="text-[18px] cursor-pointer opacity-60">✕</span>
            New search
            <span className="text-[18px] cursor-pointer opacity-60">✦</span>
          </div>
          <div className="w-[64px] h-[64px] rounded-full mx-auto mt-[26px] mb-[22px] bg-[radial-gradient(circle_at_30%_30%,#ffb37c,#ff6a8e)] flex items-center justify-center text-white text-[26px] shadow-[var(--shadow-orb)] animate-[pulse_3s_ease-in-out_infinite]">
            ✦
          </div>
          <p className="text-[var(--color-navy-soft)] text-[13.5px] leading-[1.55] max-w-[280px] mx-auto">
            Ask DietaryID to find restaurants and dishes that match your allergy profile, anywhere you go.
          </p>
          <div
            className="mt-[18px] mx-auto bg-white border border-[var(--color-chat-suggest-border)] rounded-[14px] px-3.5 py-3 text-[12.5px] text-[var(--color-muted)] text-left max-w-[300px] shadow-[var(--shadow-suggest)] cursor-pointer transition-all duration-200 hover:border-[var(--color-chat-suggest-hover)]"
            onClick={() => setChatInput("Where can I find nut-free Thai food open near me right now?")}
          >
            Where can I find nut-free Thai food open near me right now?
          </div>
          <form
            className="mt-4 mx-auto flex items-center gap-2.5 max-w-[320px] rounded-full p-[3px] bg-gradient-to-r from-[#ff8a5c] to-[#ff6a8e]"
            onSubmit={(e) => {
              e.preventDefault();
              if (chatInput.trim()) setChatInput("");
            }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask or search for anything"
              className="flex-1 border-none outline-none rounded-full px-4 py-[11px] font-sans text-[13px] text-[var(--color-ink)] bg-transparent"
              aria-label="Search"
            />
            <button type="submit" className="bg-none border-none text-white text-[17px] cursor-pointer px-3 py-0" aria-label="Send">
              ➤
            </button>
          </form>
        </div>
      </div>

      <div className="flex gap-3.5 justify-center mt-[46px] mb-[70px] flex-wrap relative z-6">
        <Link href="/signup" className="no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-7.5 py-3.5 rounded-[11px] transition-all duration-200 hover:bg-[var(--color-navy-dark)] hover:-translate-y-[1px]">
          Start free
        </Link>
        <a href="#features" className="no-underline bg-white text-[var(--color-navy)] font-semibold text-[14.5px] px-7.5 py-3.5 rounded-[11px] shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[var(--shadow-btn-light-hover)]">
          See how it works
        </a>
      </div>
    </header>
  );
}
