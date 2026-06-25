const ControlLines = {
    "2026": {
        history: { benke: 490, tekong: 522 },
        physics: { benke: 451, tekong: 514 }
    },
    "2025": {
        history: { benke: 477, tekong: 515 },
        physics: { benke: 461, tekong: 514 }
    },
    "2024": {
        history: { benke: 462, tekong: 512 },
        physics: { benke: 465, tekong: 514 }
    },
    "2023": {
        history: { yiben: 495, erben: 440 },
        physics: { yiben: 482, erben: 427 }
    },
    "2022": {
        history: { yiben: 523, erben: 480 },
        physics: { yiben: 491, erben: 435 }
    },
    "2021": {
        history: { yiben: 560, erben: 519 },
        physics: { yiben: 488, erben: 415 }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ControlLines };
}
