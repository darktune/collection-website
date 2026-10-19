import React from "react";

export interface AfricanIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

/**
 * 1. PEMPAMSIE (West African Adinkra of Stitching, Readiness & Tailoring Craft)
 * Cultural Meaning: "Sew in readiness" or "Stitch with unyielding strength".
 * Symbolism: Depicts interlocked oval stitch links and precision needle points.
 * Denotes tailoring mastery, continuous preparation, resilience, and the joining
 * of disparate threads into an unbroken garment of power.
 */
export function PempamsieIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Pempamsie - African Symbol of Stitching and Tailoring Mastery"
      {...props}
    >
      {/* Upper Interlocking Stitch Loop */}
      <path d="M12 2 C8 2, 4 4.5, 4 8 C4 11.5, 8 13.5, 12 14 C16 13.5, 20 11.5, 20 8 C20 4.5, 16 2, 12 2 Z" />
      {/* Lower Interlocking Stitch Loop */}
      <path d="M12 10 C8 10.5, 4 12.5, 4 16 C4 19.5, 8 22, 12 22 C16 22, 20 19.5, 20 16 C20 12.5, 16 10.5, 12 10 Z" />
      {/* Central Basting Eyelets */}
      <circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      {/* Taut Vertical Alignment Thread */}
      <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="1.5 2" opacity="0.6" />
    </svg>
  );
}

/**
 * 2. OJU OYA (Yoruba Aso Oke Diamond Grid & Sacred Proportional Lattice)
 * Cultural Meaning: "The Eye of the River" & Master Weaver's Diamond Proportion Matrix.
 * Symbolism: For generations in Iseyin and Oyo, master Aso Oke weavers structured
 * their loom tension around this diamond grid. It symbolizes anatomical balance,
 * harmonic proportion, exact measurement, and the symmetry of the human physique.
 */
export function OjuOyaIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Oju Oya - Yoruba Symbol of Sacred Proportion and Anatomical Harmony"
      {...props}
    >
      {/* Primary Sacred Diamond */}
      <polygon points="12 2 22 12 12 22 2 12" />
      {/* Inner Concentric Proportion Diamond */}
      <polygon points="12 6 18 12 12 18 6 12" />
      {/* Cardinal Alignment Ticks */}
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      {/* Central Focal Eye */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * 3. ABERE (The Yoruba Royal Brass Awl & Golden Handcraft Needle)
 * Cultural Meaning: Hand-forged brass needle used by royal court embroiderers (Onise-Owo).
 * Symbolism: Represents slow, uncompromised artisanal labor, ancestral patience,
 * and the sacred transmission of human intention into every stitch of bespoke cloth.
 */
export function AbereIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Abere - Yoruba Royal Handcraft Needle and Ancestral Stitch"
      {...props}
    >
      {/* Slender Tapered Needle Shank */}
      <path d="M4 20 L18 6" />
      {/* Needle Point */}
      <path d="M3 21 L4 20" strokeWidth={strokeWidth * 1.5} />
      {/* Stylized Cowrie Shell Needle Eyelet */}
      <ellipse cx="18.5" cy="5.5" rx="2.5" ry="1.75" transform="rotate(-45 18.5 5.5)" />
      {/* Golden Thread Wave curving through the eyelet */}
      <path
        d="M18.5 5.5 C 22 2, 23 7, 20.5 9.5 C 18 12, 16 15, 20 19"
        strokeDasharray="2 1.5"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * 4. ADE ARE (The Yoruba Sacred Beaded Crown of Majesty & Royalty)
 * Cultural Meaning: The conical beaded crown worn by the Oba and traditional celebrants.
 * Symbolism: As our brand ethos states: "Before anyone asks who the celebrant is, the
 * garment has already answered." The Ade symbolizes unquestioned presence, sovereignty,
 * ceremonial majesty, and the elevation of human station through royal regalia.
 */
export function AdeAreIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Ade Are - Yoruba Sacred Crown of Royal Majesty and Celebrant Elevation"
      {...props}
    >
      {/* Conical Royal Crown Profile */}
      <path d="M6 18 L8 7 L12 4 L16 7 L18 18 Z" />
      {/* Beaded Royal Base Band */}
      <rect x="5" y="18" width="14" height="2.5" rx="0.5" />
      {/* Ancestral Chevron Zigzag Beadwork (Yoruba Royal Loom Weave) */}
      <path d="M7 14 L9.5 11 L12 14 L14.5 11 L17 14" />
      {/* The Okin / Royal Ancestral Bird perched at the crown apex */}
      <circle cx="12" cy="3" r="1.25" fill="currentColor" stroke="none" />
      <path d="M12 2 C11 0.75, 13 0.75, 12 2" strokeWidth={1} />
      {/* Beaded Veil Strands (Oriade) descending from the crown rim */}
      <line x1="8" y1="21" x2="8" y2="23" strokeDasharray="1 1" />
      <line x1="12" y1="21" x2="12" y2="23" strokeDasharray="1 1" />
      <line x1="16" y1="21" x2="16" y2="23" strokeDasharray="1 1" />
    </svg>
  );
}

/**
 * 5. ASO OKE WEAVE (The Traditional West African Strip-Loom & Tension Shuttle)
 * Cultural Meaning: Handcrafted narrow-strip cloth weaving (Sanyan, Etu, Alaari).
 * Symbolism: Celebrates indigenous West African textile sovereignty. Weaving the warp
 * and weft represents weaving the threads of family, tradition, and personal milestone
 * into an enduring physical heirloom.
 */
export function AsoOkeWeaveIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Aso Oke Weave - Indigenous West African Loom and Textile Provenance"
      {...props}
    >
      {/* Horizontal Loom Frame Beams */}
      <line x1="3" y1="5" x2="21" y2="5" />
      <line x1="3" y1="19" x2="21" y2="19" />
      {/* Taut Vertical Warp Threads (Iro) */}
      <line x1="7" y1="5" x2="7" y2="19" opacity="0.6" />
      <line x1="11" y1="5" x2="11" y2="19" opacity="0.6" />
      <line x1="15" y1="5" x2="15" y2="19" opacity="0.6" />
      {/* The Central Weaving Shuttle (Aasa) traversing with woven cloth */}
      <path d="M4 12 C 7 9, 17 9, 20 12 C 17 15, 7 15, 4 12 Z" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <line x1="9" y1="12" x2="15" y2="12" strokeDasharray="1 1" />
    </svg>
  );
}

/**
 * 6. ADINKRAHENE (The Great King of Symbols / Est. 2002 Sovereign Seal of Authenticity)
 * Cultural Meaning: "Chief of the Adinkra Symbols" — Three Concentric Rings.
 * Symbolism: Greatness, charismatic leadership, royal authority, and timelessness.
 * It is the mother of all symbols. For Abraham Collection, it honors the Est. 2002 sovereign
 * lineage of intentional craft in Lagos, Nigeria.
 */

export function AdinkraheneIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Adinkrahene - The African King of Symbols and Sovereign Seal of Authenticity"
      {...props}
    >
      {/* Outer Sovereign Ring */}
      <circle cx="12" cy="12" r="9.5" />
      {/* Middle Lineage Ring */}
      <circle cx="12" cy="12" r="6" />
      {/* Inner Mastery Core */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Cardinal Alignment Notches */}
      <line x1="12" y1="1.5" x2="12" y2="3.5" />
      <line x1="12" y1="20.5" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="3.5" y2="12" />
      <line x1="20.5" y1="12" x2="22.5" y2="12" />
    </svg>
  );
}

/**
 * 7. IRUKERE (The Yoruba Royal Horsetail Scepter of Chieftaincy & Court)
 * Cultural Meaning: The beaded horsetail whisk held by monarchs, elders, and celebrants.
 * Symbolism: Authority, peaceful governance, royal court hearings, and sacred sanctuary.
 * In the atelier context, it signifies that our studio is not a retail store, but a
 * private court where each client is hosted as a dignitary holding court.
 */
export function IrukereIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Irukere - Yoruba Royal Flywhisk of Chieftaincy and Atelier Sanctuary"
      {...props}
    >
      {/* Beaded Royal Handle (Scepter Shaft) */}
      <rect x="10.5" y="14" width="3" height="7.5" rx="0.5" />
      {/* Ornamental Crown Handle Pommel */}
      <circle cx="12" cy="22" r="1.25" fill="currentColor" stroke="none" />
      {/* Diamond Beaded Chevron Accents on Handle */}
      <path d="M10.5 16.5 L12 18 L13.5 16.5" />
      {/* The Flaring Majestic Horsetail Whisk Plumes */}
      <path d="M12 14 C10 11, 6 8, 4 3 C9 5, 11 8, 12 14 Z" />
      <path d="M12 14 C12 9, 12 6, 12 2 C13 6, 13 9, 12 14 Z" />
      <path d="M12 14 C14 11, 18 8, 20 3 C15 5, 13 8, 12 14 Z" />
    </svg>
  );
}

/**
 * 8. SANKOFA (The Royal Sankofa of Transatlantic Cultural Reconnection)
 * Cultural Meaning: "Go back and reclaim your sacred inheritance".
 * Symbolism: Depicts the majestic bird looking back over its shoulder while carrying
 * the sacred egg of future generations. It is the definitive emblem for the Abraham
 * Collection Diaspora Celebration Service: connecting sons and daughters of Africa
 * across London, Atlanta, Houston, Toronto, and Dubai back to their ancestral regal grandeur.
 */
export function SankofaDiasporaIcon({ size = 24, className = "", strokeWidth = 1.25, ...props }: AfricanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Sankofa - African Symbol of Ancestral Reconnection and Diaspora Heritage"
      {...props}
    >
      {/* Proud Forward-Striding Body & Tail Feathers */}
      <path d="M16 19 C14 20, 10 20, 7 17 C5 15, 4 12, 5 9 C6 10, 8 11, 10 11 C11 11, 14 11, 16 13 C17 14, 18 16, 16 19 Z" />
      {/* Sweeping S-Curve Neck turning backward to face the past */}
      <path d="M10 11 C10 8, 11 6, 13 5 C15 4, 17 4.5, 18 6 C19 7.5, 18 9, 16.5 9" />
      {/* The Beak holding the Sacred Egg of Future Generations */}
      <circle cx="16.5" cy="9" r="1.5" fill="currentColor" stroke="none" />
      {/* Stylized Egg gem in beak */}
      <ellipse cx="14" cy="7.5" rx="1.25" ry="1.75" transform="rotate(-30 14 7.5)" strokeWidth={1} />
      {/* Grounded Talons */}
      <path d="M9 19 L8 22" />
      <path d="M13 19 L13 22" />
    </svg>
  );
}

// =========================================================================
// BACKWARD-COMPATIBLE SARTORIAL ALIASES
// Ensures zero breaking changes across existing components while promoting
// authentic African naming conventions.
// =========================================================================

/** @deprecated Use PempamsieIcon for the African symbol of stitching & tailoring mastery */
export const ShearsIcon = PempamsieIcon;

/** @deprecated Use OjuOyaIcon for the African symbol of sacred proportion & measurement */
export const MeasuringTapeIcon = OjuOyaIcon;

/** @deprecated Use AbereIcon for the African symbol of royal needlework & handcraft */
export const AtelierNeedleIcon = AbereIcon;

/** @deprecated Use AdeAreIcon for the African symbol of royal celebrant majesty */
export const AgbadaSilhouetteIcon = AdeAreIcon;

/** @deprecated Use AsoOkeWeaveIcon for the African symbol of indigenous loom provenance */
export const LoomShuttleIcon = AsoOkeWeaveIcon;

/** @deprecated Use AdinkraheneIcon for the African King of Symbols / Est. 2002 seal */
export const HeritageSealIcon = AdinkraheneIcon;


/** @deprecated Use IrukereIcon for the African royal scepter of sovereign court sanctuary */
export const StudioFittingIcon = IrukereIcon;

/** @deprecated Use SankofaDiasporaIcon for the African symbol of transatlantic reconnection */
export const DiasporaGlobeIcon = SankofaDiasporaIcon;
