"use client";

import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

const animationDataCache = new Map();

const LottieIcon = ({
  src,
  color,
  width = 80,
  height = 80,
  className = "",
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const cacheKey = `${src}-${color || "default"}`;

  useEffect(() => {
    let isMounted = true;

    const modifyLottieColors = (animationData, newColor) => {
      const clonedData = JSON.parse(JSON.stringify(animationData));

      const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const formattedHex = hex.replace(
          shorthandRegex,
          (_, r, g, b) => r + r + g + g + b + b
        );
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
          formattedHex
        );

        return result
          ? [
              parseInt(result[1], 16) / 255,
              parseInt(result[2], 16) / 255,
              parseInt(result[3], 16) / 255,
              1, // Alpha always 1
            ]
          : [0, 0, 0, 1]; // Default black
      };

      const rgbColor = hexToRgb(newColor);

      const traverseLayers = (obj) => {
        if (Array.isArray(obj)) {
          obj.forEach((item) => traverseLayers(item));
        } else if (obj && typeof obj === "object") {
          if (obj.ty === "fl" && obj.c?.k) {
            if (Array.isArray(obj.c.k) && obj.c.k.length === 4) {
              obj.c.k = rgbColor;
            } else if (obj.c.k?.i && obj.c.k?.o && Array.isArray(obj.c.k.k)) {
              obj.c.k.k.forEach((keyframe) => {
                if (Array.isArray(keyframe.s) && keyframe.s.length === 4) {
                  keyframe.s = rgbColor;
                }
              });
            }
          }

          for (const key in obj) {
            if (obj[key] && typeof obj[key] === "object") {
              traverseLayers(obj[key]);
            }
          }
        }
      };

      if (clonedData.layers) {
        traverseLayers(clonedData.layers);
      }

      return clonedData;
    };

    const fetchAnimationData = async () => {
      try {
        setLoading(true);

        if (animationDataCache.has(src)) {
          return animationDataCache.get(src);
        }

        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`);
        }

        const data = await response.json();

        animationDataCache.set(src, data);

        return data;
      } catch (error) {
        console.error("Error loading animation data:", error);
        return null;
      }
    };

    const createAnimation = async () => {
      try {
        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        if (!containerRef.current || !isMounted) return;

        const originalData = await fetchAnimationData();
        if (!originalData) return;

        const animationData = color
          ? modifyLottieColors(originalData, color)
          : JSON.parse(JSON.stringify(originalData));

        if (!containerRef.current || !isMounted) return;

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            className: "lottie-svg",
            progressiveLoad: false,
            hideOnTransparent: true,
          },
        });

        animationRef.current.addEventListener("DOMLoaded", () => {
          if (isMounted) {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error creating animation:", error);
        setLoading(false);
      }
    };

    createAnimation();

    return () => {
      isMounted = false;
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [src, color, cacheKey]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s" }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default LottieIcon;
