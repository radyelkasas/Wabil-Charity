"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Styled Components
const SliderContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-size: 250px, 100%;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
  }
`;

const GridContainer = styled.div`
  gap: 0.5rem;
  flex: none;
  position: relative;
  width: 220vw;
  height: 220vh;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 100%;
  transform: rotate(-15deg);
  transform-origin: center center;
  @media (max-width: 768px) {
    height: 60vh;
    transform: rotate(0deg);
  }
`;

// Contenedor para cada fila con movimiento infinito
const RowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// La fila real que contiene las imágenes
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  will-change: transform;
  position: absolute;
  width: 100%;
`;

// Duplicado de la fila para crear efecto continuo
const RowDuplicate = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  will-change: transform;
  position: absolute;
  width: 100%;
`;

const Item = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1;
`;

const ItemInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ItemImage = styled.div<{ $bgImage: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.$bgImage});
  transition: transform 0.5s ease-out;
  will-change: transform, filter;

  &:hover {
    transform: scale(1.05);
  }
`;

// Image data array
const imageData = [
  "https://cdn.prod.website-files.com/64c7a82ebb2301da0d91322f/65c416506faf02968046f1bb_palestine%20v.webp",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65a67ef3e331626634f50073_01-06.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65ad3b289a3198aab7fd52bf_orig-18.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65ad3a2be855c3cdd49da431_orig-15.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65ad3c8454485496e9bf9f85_orig-19.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65a67e9c34efe442c4064efb_01-04.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65a67c9f73d809d33f29ebe8_01-01.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/66462f7f6cb9a76cb436792f_Untitled%20design.png",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65b10e2086b717747498cae2_eeee3.png",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65a6882cb2e1e4bac276d702_01-11.jpg",
  "https://cdn.prod.website-files.com/64c7f4cbdcc768b8275308ea/65ad3a6a9a3198aab7fcc4e3_orig-16.jpg",
];

const ImageSlider: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rowsDuplicateRef = useRef<Array<HTMLDivElement | null>>([]);

  // Función para renderizar una fila de imágenes
  const renderImageRow = (startIndex: number, imagesPerRow: number) => {
    return Array.from({ length: imagesPerRow }, (_, i) => {
      const imageIndex = (startIndex + i) % imageData.length;

      return (
        <Item key={i}>
          <ItemInner className="item-inner">
            <ItemImage
              $bgImage={imageData[imageIndex]}
              className="row__item-img"
            />
          </ItemInner>
        </Item>
      );
    });
  };

  // Renderiza una fila completa con su duplicado para movimiento infinito
  const renderRow = (rowIndex: number) => {
    const imagesPerRow = 8;
    const startImageIndex = (rowIndex * 3) % imageData.length;

    return (
      <RowContainer key={rowIndex}>
        <Row
          ref={(el) => {
            rowsRef.current[rowIndex] = el;
          }}
          className="row-original"
        >
          {renderImageRow(startImageIndex, imagesPerRow)}
        </Row>
        <RowDuplicate
          ref={(el) => {
            rowsDuplicateRef.current[rowIndex] = el;
          }}
          className="row-duplicate"
        >
          {renderImageRow(startImageIndex, imagesPerRow)}
        </RowDuplicate>
      </RowContainer>
    );
  };

  // Configuración y animación
  useEffect(() => {
    if (!gridRef.current) return;

    // Crear animaciones infinitas para cada fila
    const setupInfiniteAnimation = () => {
      // Para cada fila original
      rowsRef.current.forEach((row, index) => {
        if (!row) return;
        const duplicateRow = rowsDuplicateRef.current[index];
        if (!duplicateRow) return;

        // Determinar dirección - filas pares van a la derecha, impares a la izquierda
        const direction = index % 2 === 0 ? 1 : -1;

        // Velocidades diferentes para cada fila
        const speeds = [60, 80, 50, 70, 65];
        const speed = speeds[index % speeds.length];

        // Posicionar la fila original y su duplicado
        gsap.set(row, { x: 0 });
        gsap.set(duplicateRow, { x: direction < 0 ? "100%" : "-100%" });

        // Crear timeline para animación continua
        const tl = gsap.timeline({ repeat: -1 });

        if (direction > 0) {
          // Movimiento hacia la derecha
          tl.to(row, { x: "100%", duration: speed, ease: "none" })
            .to(duplicateRow, { x: "0%", duration: speed, ease: "none" }, 0)
            .set(row, { x: "-100%" })
            .to(row, { x: "0%", duration: speed, ease: "none" })
            .to(
              duplicateRow,
              { x: "100%", duration: speed, ease: "none" },
              "-=" + speed
            );
        } else {
          // Movimiento hacia la izquierda
          tl.to(row, { x: "-100%", duration: speed, ease: "none" })
            .to(duplicateRow, { x: "0%", duration: speed, ease: "none" }, 0)
            .set(row, { x: "100%" })
            .to(row, { x: "0%", duration: speed, ease: "none" })
            .to(
              duplicateRow,
              { x: "-100%", duration: speed, ease: "none" },
              "-=" + speed
            );
        }
      });
    };

    // Iniciar animaciones
    setupInfiniteAnimation();

    // Limpieza
    return () => {
      gsap.killTweensOf([...rowsRef.current, ...rowsDuplicateRef.current]);
    };
  }, []);

  return (
    <SliderContainer>
      <GridContainer ref={gridRef}>
        {Array.from({ length: 5 }, (_, i) => renderRow(i))}
      </GridContainer>
    </SliderContainer>
  );
};

export default ImageSlider;
