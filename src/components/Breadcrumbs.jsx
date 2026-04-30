import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Box,
    Zap,
    Tag,
    Settings,
    User,
    ShoppingCart,
    FileText,
} from "lucide-react";

// Route → Icon map
const SEGMENT_ICONS = {
    "": Home,
    home: Home,
    products: Box,
    electronics: Zap,
    category: Tag,
    settings: Settings,
    profile: User,
    cart: ShoppingCart,
    orders: FileText,
};

function getIcon(segment) {
    return SEGMENT_ICONS[segment.toLowerCase()] ?? Box;
}

function capitalize(str) {
    return str
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs() {
    const location = useLocation();
    const paths = location.pathname.split("/").filter(Boolean);

    return (
        <nav
            aria-label="Breadcrumb"
            style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 6,
                margin: "24px 0",
                padding: "14px 20px",
                fontFamily: "'Cormorant Garamond', serif",
                background: "rgba(20,20,20,0.72)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
                width: "100%",
                boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
            }}
        >
            {/* Home */}
            <CrumbLink to="/" label="Home" icon={Home} />

            {paths.map((seg, i) => {
                const to = "/" + paths.slice(0, i + 1).join("/");
                const isLast = i === paths.length - 1;
                const Icon = getIcon(seg);

                return (
                    <span
                        key={to}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <Slash />

                        {isLast ? (
                            <CrumbActive
                                label={capitalize(seg)}
                                icon={Icon}
                            />
                        ) : (
                            <CrumbLink
                                to={to}
                                label={capitalize(seg)}
                                icon={Icon}
                            />
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

/* ───────────────────────── */
/* Breadcrumb Link */
/* ───────────────────────── */

function CrumbLink({ to, label, icon: Icon }) {
    return (
        <Link
            to={to}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 15,
                fontWeight: 500,
                color: "#cfc6bb",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.04)",
                transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(232,145,58,0.12)";
                e.currentTarget.style.borderColor = "rgba(232,145,58,0.25)";
                e.currentTarget.style.color = "#f5efe6";
                e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.color = "#cfc6bb";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <Icon size={14} strokeWidth={1.8} />
            {label}
        </Link>
    );
}

/* ───────────────────────── */
/* Active Breadcrumb */
/* ───────────────────────── */

function CrumbActive({ label, icon: Icon }) {
    return (
        <span
            aria-current="page"
            style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(232,145,58,0.14)",
                border: "1px solid rgba(232,145,58,0.22)",
                color: "#e8913a",
                fontSize: 15,
                fontWeight: 600,
            }}
        >
            <Icon size={14} strokeWidth={2} />
            {label}
        </span>
    );
}

/* ───────────────────────── */
/* Divider */
/* ───────────────────────── */

function Slash() {
    return (
        <span
            style={{
                color: "rgba(255,255,255,0.18)",
                fontSize: 16,
                margin: "0 2px",
                userSelect: "none",
            }}
        >
            →
        </span>
    );
}