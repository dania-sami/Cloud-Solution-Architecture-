const baseIntro = "Hi I am Dania. I am happy that you are here looking at my work and my profile. I am a masters student at KTH and I also work at KTH and my background is in computer engineering cloud and AI. ";

const skillScripts = {
  communication: {
    label: "Communication and presentation",
    text: baseIntro + "Communication is the part I care about the most. When I build something in cloud or data I always ask how I would explain it to a senior leader who has five minutes between meetings. For example during my work and studies I often turn complex setups into one visual with one simple story so people do not feel lost. I enjoy speaking in front of a group and I love transforming technical details into clear human language like I am doing right now with this avatar."
  },
  stakeholders: {
    label: "Stakeholder management",
    text: baseIntro + "Good architecture only works if people trust it. I like to think in personas such as CTO CFO or security officer and frame the same design from their angle. In previous projects I have had to balance what a team wanted with what leadership expected and I learned to listen first reflect back what I heard and then propose options with tradeoffs. This avatar is another example because it is built to respect your time as a recruiter while still giving you a real feeling for who I am."
  },
  analytical: {
    label: "Analytical and problem solving",
    text: baseIntro + "I enjoy analytical work where the situation is messy at the start. A common pattern for me is to map a large vague problem into a few smaller questions and then turn those into experiments or measurements. With cloud that might mean tracing a latency issue across services and logs. With people it might mean understanding where a communication chain broke and fixing it. I see analysis as a calm and friendly way to remove stress and give everyone a clear next step."
  },
  cloud: {
    label: "Cloud and architecture",
    text: baseIntro + "My background is in computer engineering and I have hands on experience in cloud with both Azure and Amazon Web Services. I enjoy deciding when to use App Service when to use Functions and how to shape data layers with services like Cosmos DB or SQL. I like drawing diagrams where every box has a reason either for reliability cost or developer focus. For this avatar the cloud thinking is about user experience how fast it loads and how it guides you through a story instead of just being a static page."
  },
  learning: {
    label: "Learning and change",
    text: baseIntro + "The role mentions change management and growth mindset which fits me very well. I like the feeling of being slightly outside my comfort zone because that is where learning happens. Taking on new tools AI features or even this creative avatar idea is my way of showing that I am not afraid to try something unusual as long as it creates value. In a Microsoft team I would bring that same energy to learning from senior architects and then turning that learning into real outcomes for customers."
  }
};

const speechTextEl = document.getElementById("speechText");
const speechRoleEl = document.getElementById("speechRole");
const avatarEl = document.getElementById("avatar");
const skillButtons = document.querySelectorAll(".skill-card");

let speaking = false;
let currentUtterance = null;
let typeInterval = null;

function setActiveSkill(key) {
  skillButtons.forEach(btn => {
    if (btn.dataset.skill === key) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function typeText(text) {
  if (typeInterval) {
    clearInterval(typeInterval);
    typeInterval = null;
  }
  speechTextEl.textContent = "";
  let index = 0;
  typeInterval = setInterval(() => {
    speechTextEl.textContent = text.slice(0, index);
    index += 1;
    if (index > text.length) {
      clearInterval(typeInterval);
      typeInterval = null;
    }
  }, 18);
}

function stopSpeaking() {
  speaking = false;
  avatarEl.classList.remove("avatar-speaking");
  if (currentUtterance && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (typeInterval) {
    clearInterval(typeInterval);
    typeInterval = null;
  }
}

function speakSkill(key) {
  const data = skillScripts[key];
  if (!data) return;

  stopSpeaking();
  setActiveSkill(key);

  speechRoleEl.textContent = data.label;
  typeText(data.text);
  avatarEl.classList.add("avatar-speaking");
  speaking = true;

  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(data.text);
    utter.rate = 0.9;
    utter.pitch = 1.02;
    utter.onend = () => {
      speaking = false;
      avatarEl.classList.remove("avatar-speaking");
    };
    currentUtterance = utter;
    window.speechSynthesis.speak(utter);
  } else {
    setTimeout(() => {
      speaking = false;
      avatarEl.classList.remove("avatar-speaking");
    }, 12000);
  }
}

skillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.skill;
    speakSkill(key);
  });
});

// initial message
speechTextEl.textContent = "Tap one of the skill cards and I will start with a short hello and then tell you how I use that skill in real life.";
