// animations.js
export const inputAnimation = {
    hidden: {
        width: 0,
        padding: 0,
        transition: {
            duration: 0.2,
        },
    },
    show: {
        width: "140px",
        padding: "5px 15px",
        transition: {
            duration: 0.2,
        },
    },
};

export const showAnimation = {
    hidden: {
        width: 0,
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    show: {
        opacity: 1,
        width: "auto",
        transition: {
            duration: 0.5,
        },
    },
};

export const menuAnimation = {
    hidden: {
        opacity: 0,
        height: 0,
        // padding: 0,
        transition: { duration: 0.3, when: "afterChildren" },
        y: -20,
    },
    show: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.3, when: "beforeChildren" },
        y: 0,
    },
};

export const menuItemAnimation = {
    hidden: (i) => ({
        padding: 0,
        // x: "-100%",
        y: 20,
        transition: { duration: (i + 1) * 0.1 },
    }),
    show: (i) => ({
        // x: 0,
        opacity: 1,
        y: 0,
        transition: { duration: (i + 1) * 0.1 },
    }),
};
