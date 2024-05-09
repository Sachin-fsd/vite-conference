import React, { useEffect } from "react";

function CustomizeTheme({ isThemeOpen,setIsThemeOpen }) {
  const themeModal = document.querySelector(".customize-theme");

  const fontSizes = document.querySelectorAll(".choose-size span");
  const root = document.querySelector(":root");

  const colorPalette = document.querySelectorAll(".choose-color span");

  const bg1 = document.querySelector(".bg-1");
  const bg2 = document.querySelector(".bg-2");
  const bg3 = document.querySelector(".bg-3");

  const openThemeModal = () => {
    themeModal.style.display = "grid";
  };
  useEffect(() => {
    if (isThemeOpen) {
      openThemeModal();
    }
  }, [isThemeOpen]);

  // Close Modal
  const closeThemeModal = (e) => {
    const themeModal = document.querySelector(".customize-theme");
    if (e.target.classList.contains("customize-theme")) {
      themeModal.style.display = "none";
      setIsThemeOpen(false)
    }
  };

  // Closes Modal
  // themeModal.addEventListener("click", closeThemeModal);
  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("click", closeThemeModal);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeThemeModal);
    };
  }, []);

  const removeSizeSelector = () => {
    fontSizes.forEach((size) => {
      size.classList.remove("active");
    });
  };

  fontSizes.forEach((size) => {
    size.addEventListener("click", () => {
      removeSizeSelector();
      let fontSize;
      size.classList.toggle("active");

      if (size.classList.contains("font-size-1")) {
        fontSize = "10px";
        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right", "5.4rem");
      } else if (size.classList.contains("font-size-2")) {
        fontSize = "13px";
        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right", "-7rem");
      } else if (size.classList.contains("font-size-3")) {
        fontSize = "16px";
        root.style.setProperty("--sticky-top-left", "-2rem");
        root.style.setProperty("--sticky-top-right", "-17rem");
      } else if (size.classList.contains("font-size-4")) {
        fontSize = "19px";
        root.style.setProperty("--sticky-top-left", "-5rem");
        root.style.setProperty("--sticky-top-right", "-25rem");
      } else {
        fontSize = "22px";
        root.style.setProperty("--sticky-top-left", "-12rem");
        root.style.setProperty("--sticky-top-right", "-35rem");
      }

      // Change the font size of the root element
      document.querySelector("html").style.fontSize = fontSize;
    });
  });

  /*=============================================
  =            COLORS           
  =============================================*/
  // Change active class from colors
  const changeActiveColorClass = () => {
    colorPalette.forEach((color) => {
      color.classList.remove("active");
    });
  };

  // change primary colors
  colorPalette.forEach((color) => {
    color.addEventListener("click", () => {
      let primaryHue;
      changeActiveColorClass();
      if (color.classList.contains("color-1")) {
        primaryHue = 252;
      } else if (color.classList.contains("color-2")) {
        primaryHue = 52;
      } else if (color.classList.contains("color-3")) {
        primaryHue = 352;
      } else if (color.classList.contains("color-4")) {
        primaryHue = 152;
      } else if (color.classList.contains("color-5")) {
        primaryHue = 202;
      }
      color.classList.add("active");
      root.style.setProperty("--primary-color-hue", primaryHue);
    });
  });

  // theme background values
  let lightColorLightness;
  let whiteColorLightness;
  let darkColorLightness;

  // Change background
  const changeBackground = () => {
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
  };

  function BG1() {
    bg1.classList.add("active");

    //remove active class from the others
    bg2.classList.remove("active");
    bg3.classList.remove("active");

    // remove customize background
    window.location.reload();
  }

  function BG2() {
    whiteColorLightness = "20%";
    lightColorLightness = "15%";
    darkColorLightness = "95%";

    // add active class
    bg2.classList.add("active");

    //remove active class from the others
    bg1.classList.remove("active");
    bg3.classList.remove("active");
    changeBackground();
  }

  function BG3() {
    whiteColorLightness = "10%";
    lightColorLightness = "0%";
    darkColorLightness = "95%";

    // add active class
    bg2.classList.add("active");

    //remove active class from the others
    bg1.classList.remove("active");
    bg2.classList.remove("active");
    changeBackground();
  }

  return (
    <div className="customize-theme">
      <div className="card">
        <h2>Customize your view</h2>
        <p className="text-muted">Manage your font size, color and background</p>
        {/* <!-- FONT SIZES --> */}
        <div className="font-size">
          <h4>Font Size</h4>
          <div>
            <h6>Aa</h6>
            <div className="choose-size">
              <span className="font-size-1"></span>
              <span className="font-size-2 active"></span>
              <span className="font-size-3"></span>
              <span className="font-size-4"></span>
              <span className="font-size-5"></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>
        {/* <!-- PRIMARY COLORS --> */}
        <div className="color">
          <h4>Color</h4>
          <div className="choose-color">
            <span className="color-1 active"></span>
            <span className="color-2"></span>
            <span className="color-3"></span>
            <span className="color-4"></span>
            <span className="color-5"></span>
          </div>
        </div>
        {/* <!-- BACKGROUND COLORS --> */}
        <div className="background">
          <h4>Bacground</h4>
          <div className="choose-bg">
            <div className="bg-1 active" onClick={BG1}>
              <span></span>
              <h5 htmlFor="bg-1">Light</h5>
            </div>
            <div className="bg-2" onClick={BG2}>
              <span></span>
              <h5>Dim</h5>
            </div>
            <div className="bg-3" onClick={BG3}>
              <span></span>
              <h5 htmlFor="bg-3">Lights out</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CustomizeTheme };
