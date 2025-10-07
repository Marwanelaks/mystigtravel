import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          lighter: "hsl(var(--primary-lighter))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          dark: "hsl(var(--muted-dark))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          dark: "hsl(var(--accent-dark))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          sacred: "hsl(var(--card-sacred))",
          islamic: "hsl(var(--card-islamic))",
        },
        islamic: {
          green: "hsl(var(--islamic-green))",
          "green-light": "hsl(var(--islamic-green-light))",
          "green-lighter": "hsl(var(--islamic-green-lighter))",
          "green-dark": "hsl(var(--islamic-green-dark))",
          gold: "hsl(var(--islamic-gold))",
          "gold-light": "hsl(var(--islamic-gold-light))",
          "gold-dark": "hsl(var(--islamic-gold-dark))",
          beige: "hsl(var(--islamic-beige))",
          "beige-dark": "hsl(var(--islamic-beige-dark))",
        },
        sacred: {
          white: "hsl(var(--sacred-white))",
          cream: "hsl(var(--sacred-cream))",
          "cream-dark": "hsl(var(--sacred-cream-dark))",
        },
        sand: {
          beige: "hsl(var(--sand-beige))",
          "beige-dark": "hsl(var(--sand-beige-dark))",
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive'],
        cairo: ['Cairo', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
