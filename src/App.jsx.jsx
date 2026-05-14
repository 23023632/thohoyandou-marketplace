import { useState, useRef, useEffect } from "react";

// ── Venda Colour Palette ──────────────────────────────────────
const V = {
  clay:       "#7A2E0E",
  terracotta: "#B84A22",
  ochre:      "#C97D0A",
  gold:       "#E09A18",
  sand:       "#EED49A",
  cream:      "#FAF0D7",
  bark:       "#2E1508",
  earth:      "#4A2010",
  sage:       "#3D6040",
  rust:       "#8B2A0C",
  muted:      "#8A6045",
  border:     "#D4A870",
  night:      "#180C04",
  deepSage:   "#2A4530",
  amber:      "#D4840A",
  softGold:   "#F5C842",
};

// ── Thohoyandou Villages ─────────────────────────────────────
const VILLAGES = [
  "Thohoyandou CBD",
  "Sibasa",
  "Shayandima",
  "Makwarela",
  "Tshilamba",
  "Ngovhela",
  "Tshirunzi",
  "Mphephu",
  "Lwamondo",
  "Tshififi",
  "Muledane",
  "Vuwani",
  "Elim",
  "Kutama",
  "Tshirolwe",
  "Matangari",
  "Dzanani",
  "Mutale",
  "Ha-Mashamba",
  "Tshipise",
  "Makhuvha",
  "Bungeni",
  "Folovhodwe",
  "Gondeni",
  "Ha-Mphaphuli",
];

// ── Global CSS ────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Lora', Georgia, serif; background: ${V.cream}; color: ${V.bark}; -webkit-font-smoothing: antialiased; }

.stripe {
  height: 8px;
  background: repeating-linear-gradient(90deg,
    ${V.terracotta} 0px, ${V.terracotta} 14px,
    ${V.gold} 14px, ${V.gold} 28px,
    ${V.clay} 28px, ${V.clay} 42px,
    ${V.sage} 42px, ${V.sage} 56px);
}
.stripe-sm {
  height: 4px;
  background: repeating-linear-gradient(90deg,
    ${V.terracotta} 0px, ${V.terracotta} 8px,
    ${V.gold} 8px, ${V.gold} 16px,
    ${V.clay} 16px, ${V.clay} 24px,
    ${V.sage} 24px, ${V.sage} 32px);
}

.diamond-bg {
  background-color: ${V.bark};
  background-image:
    linear-gradient(45deg,  rgba(201,125,10,.13) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(184,74,34,.13)  25%, transparent 25%),
    linear-gradient(45deg,  transparent 75%, rgba(61,96,64,.11)  75%),
    linear-gradient(-45deg, transparent 75%, rgba(201,125,10,.09) 75%);
  background-size: 20px 20px;
}

.weave-bg {
  background-color: ${V.earth};
  background-image:
    repeating-linear-gradient(0deg,   transparent, transparent 3px, rgba(224,154,24,.1) 3px, rgba(224,154,24,.1) 4px),
    repeating-linear-gradient(90deg,  transparent, transparent 3px, rgba(184,74,34,.1)  3px, rgba(184,74,34,.1)  4px);
}

.tri-bg {
  background-color: ${V.night};
  background-image:
    repeating-linear-gradient( 60deg, rgba(201,125,10,.06) 0, rgba(201,125,10,.06) 1px, transparent 1px, transparent 28px),
    repeating-linear-gradient(120deg, rgba(184,74,34,.06)  0, rgba(184,74,34,.06)  1px, transparent 1px, transparent 28px),
    repeating-linear-gradient(180deg, rgba(61,96,64,.04)   0, rgba(61,96,64,.04)   1px, transparent 1px, transparent 28px);
}

.vcard {
  background: #fffaf0;
  border: 1.5px solid ${V.border};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(46,21,8,.07);
  transition: box-shadow .2s;
}
.vcard:hover { box-shadow: 0 4px 20px rgba(46,21,8,.12); }
.vcard::before {
  content: '';
  display: block;
  height: 4px;
  background: repeating-linear-gradient(90deg,
    ${V.terracotta} 0, ${V.terracotta} 8px,
    ${V.gold} 8px, ${V.gold} 16px,
    ${V.clay} 16px, ${V.clay} 24px);
}

.product-tile {
  background: #fffaf0;
  border: 1.5px solid ${V.border};
  border-radius: 4px;
  overflow: hidden;
  transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
  box-shadow: 0 2px 10px rgba(122,46,14,.1);
}
.product-tile:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 16px 36px rgba(122,46,14,.22);
}

.product-img {
  background: linear-gradient(135deg, #f5e9cc 0%, #efe0b8 100%);
  background-image:
    repeating-linear-gradient(45deg,  rgba(201,125,10,.06) 0, rgba(201,125,10,.06) 1px, transparent 1px, transparent 10px),
    repeating-linear-gradient(-45deg, rgba(184,74,34,.06)  0, rgba(184,74,34,.06)  1px, transparent 1px, transparent 10px);
  display: flex; align-items: center; justify-content: center;
  min-height: 160px;
  position: relative;
  overflow: hidden;
}
.product-img img {
  width: 100%; height: 160px; object-fit: cover; display: block;
}
.product-img .emoji-fallback {
  font-size: 56px;
  padding: 24px 0;
}
.product-img::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
  background: repeating-linear-gradient(90deg, ${V.terracotta} 0, ${V.terracotta} 8px, ${V.gold} 8px, ${V.gold} 16px, ${V.clay} 16px, ${V.clay} 24px);
}

.vbtn {
  font-family: 'Cinzel', serif;
  font-weight: 600;
  letter-spacing: .6px;
  border-radius: 3px;
  cursor: pointer;
  transition: all .16s;
  border: 2px solid transparent;
  padding: 9px 22px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.vbtn:active { transform: scale(.97); }

.vinput {
  font-family: 'Lora', serif;
  font-size: 14px;
  padding: 11px 14px;
  border: 1.5px solid ${V.border};
  border-radius: 3px;
  background: ${V.cream};
  color: ${V.bark};
  display: block;
  width: 100%;
  transition: border-color .15s, box-shadow .15s;
}
.vinput:focus {
  outline: none;
  border-color: ${V.terracotta};
  box-shadow: 0 0 0 3px rgba(184,74,34,.18);
}
.vinput::placeholder { color: ${V.muted}; opacity: .6; }

.vdivider {
  height: 3px; border: none;
  background: repeating-linear-gradient(90deg,
    ${V.terracotta} 0, ${V.terracotta} 12px,
    ${V.gold} 12px, ${V.gold} 24px,
    ${V.clay} 24px, ${V.clay} 36px,
    ${V.sage} 36px, ${V.sage} 48px);
  margin: 24px 0;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%,100% { opacity: 1; } 50% { opacity: .5; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}
.fade-up  { animation: fadeUp .4s ease forwards; }
.slide-in { animation: slideIn .3s ease forwards; }

.trow:hover { background: rgba(201,125,10,.08) !important; }

::-webkit-scrollbar       { width: 7px; }
::-webkit-scrollbar-track { background: ${V.cream}; }
::-webkit-scrollbar-thumb { background: ${V.terracotta}; border-radius: 3px; }

.cat-pill {
  border-radius: 20px;
  padding: 6px 18px;
  cursor: pointer;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all .16s;
  border: 2px solid;
}

/* OTP boxes */
.otp-box {
  width: 48px; height: 56px;
  text-align: center;
  font-family: 'Cinzel', serif;
  font-size: 22px;
  font-weight: 700;
  border: 2px solid ${V.border};
  border-radius: 4px;
  background: ${V.cream};
  color: ${V.bark};
  transition: border-color .15s, box-shadow .15s;
}
.otp-box:focus {
  outline: none;
  border-color: ${V.terracotta};
  box-shadow: 0 0 0 3px rgba(184,74,34,.18);
}

/* Image upload area */
.img-upload-zone {
  border: 2px dashed ${V.border};
  border-radius: 4px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  background: rgba(238,212,154,.18);
  transition: border-color .2s, background .2s;
}
.img-upload-zone:hover {
  border-color: ${V.terracotta};
  background: rgba(184,74,34,.07);
}

/* Village badge */
.village-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: ${V.sage};
  color: ${V.cream};
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  font-family: 'Cinzel', serif;
  font-weight: 600;
  letter-spacing: .5px;
}

/* Step indicator */
.step-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  transition: all .2s;
}

/* Notification toast */
.toast {
  position: fixed;
  bottom: 24px; right: 24px;
  background: ${V.earth};
  color: ${V.sand};
  padding: 14px 20px;
  border-radius: 4px;
  font-family: 'Lora', serif;
  font-size: 14px;
  z-index: 9999;
  border-left: 4px solid ${V.gold};
  box-shadow: 0 6px 24px rgba(0,0,0,.3);
  animation: slideIn .3s ease forwards;
  max-width: 320px;
}

/* Floating label wrapper */
.field-wrap { position: relative; margin-bottom: 14px; }
.field-label {
  display: block;
  font-size: 12px;
  font-family: 'Cinzel', serif;
  letter-spacing: .8px;
  color: ${V.muted};
  margin-bottom: 5px;
  text-transform: uppercase;
}

/* Rating stars */
.star { cursor: pointer; font-size: 20px; transition: transform .1s; }
.star:hover { transform: scale(1.2); }

/* Progress bar */
.prog-bar {
  height: 8px; border-radius: 4px;
  background: ${V.sand};
  overflow: hidden;
}
.prog-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, ${V.terracotta}, ${V.gold});
  transition: width .6s cubic-bezier(.34,1.56,.64,1);
}

/* Image preview strip */
.img-strip {
  display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;
}
.img-thumb {
  width: 60px; height: 60px; object-fit: cover;
  border-radius: 3px; border: 2px solid ${V.border};
  cursor: pointer; transition: border-color .15s;
}
.img-thumb:hover { border-color: ${V.terracotta}; }
.img-thumb.active { border-color: ${V.gold}; box-shadow: 0 0 0 2px ${V.gold}; }

/* Modal overlay */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(24,12,4,.7);
  z-index: 500;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-box {
  background: ${V.cream};
  border-radius: 6px;
  max-width: 520px; width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid ${V.border};
  box-shadow: 0 20px 60px rgba(0,0,0,.5);
}
`;

// ── Seed Data ─────────────────────────────────────────────────
const SEED_VENDORS = [
  { id:1, businessName:"Masindi Fresh Produce",  ownerName:"Masindi Netshituka",  email:"masindi@gmail.com",  phone:"0721234567", category:"Agriculture", description:"Fresh seasonal produce from the Limpopo fields.", status:"approved", joined:"2024-01-10", password:"vendor1", village:"Thohoyandou CBD", avatar:null },
  { id:2, businessName:"Venda Crafts Hub",        ownerName:"Tshililo Mukwevho",   email:"tshililo@gmail.com", phone:"0839876543", category:"Handcraft",   description:"Authentic hand-crafted Venda art and baskets.",  status:"approved", joined:"2024-03-15", password:"vendor2", village:"Sibasa",          avatar:null },
  { id:3, businessName:"Thohoyandou Spices",      ownerName:"Ndi Ramavhoya",       email:"ndi@gmail.com",      phone:"0764567890", category:"Food",        description:"Traditional Venda spices and dried foods.",      status:"pending",  joined:"2025-03-28", password:"vendor3", village:"Makwarela",       avatar:null },
];

const SEED_PRODUCTS = [
  { id:1, vendorId:1, name:"Mixed Vegetable Box",  price:85,  stock:40, category:"Agriculture", emoji:"🥦", description:"Fresh seasonal vegetables from Limpopo.", approved:true,  images:[], rating:4.5, reviews:12 },
  { id:2, vendorId:1, name:"Morogo Bundle",          price:30,  stock:80, category:"Agriculture", emoji:"🌿", description:"Traditional wild spinach, hand-picked daily.", approved:true,  images:[], rating:4.8, reviews:8  },
  { id:3, vendorId:2, name:"Venda Wooden Mask",      price:320, stock:12, category:"Handcraft",   emoji:"🎭", description:"Hand-carved ceremonial mask by local artisan.", approved:true,  images:[], rating:5.0, reviews:5  },
  { id:4, vendorId:2, name:"Woven Basket (Large)",   price:150, stock:25, category:"Handcraft",   emoji:"🧺", description:"Traditional Venda weaving, natural grass.", approved:true,  images:[], rating:4.3, reviews:15 },
  { id:5, vendorId:3, name:"Mutodi Spice Mix",        price:55,  stock:60, category:"Food",        emoji:"🌶️",description:"Authentic Venda spice blend for cooking.", approved:false, images:[], rating:0,   reviews:0  },
];

const SEED_ORDERS = [
  { id:"ORD-001", customerId:"cust-1", customerName:"Lufuno Tshivhase",  vendorId:1, productId:1, qty:2, total:170, status:"Delivered",  date:"2025-03-28", village:"Thohoyandou CBD", paymentRef:"PAY-7831" },
  { id:"ORD-002", customerId:"cust-2", customerName:"Rendani Mphephu",   vendorId:2, productId:3, qty:1, total:320, status:"In Transit", date:"2025-04-01", village:"Sibasa",          paymentRef:"PAY-7832" },
  { id:"ORD-003", customerId:"cust-1", customerName:"Lufuno Tshivhase",  vendorId:1, productId:2, qty:3, total:90,  status:"Processing", date:"2025-04-02", village:"Shayandima",      paymentRef:"PAY-7833" },
];

const SEED_CUSTOMERS = [
  { id:"cust-1", name:"Lufuno Tshivhase",  email:"lufuno@gmail.com",  phone:"0761112222", village:"Thohoyandou CBD", password:"cust1",  joined:"2024-06-01", avatar:null },
  { id:"cust-2", name:"Rendani Mphephu",   email:"rendani@gmail.com", phone:"0839998888", village:"Sibasa",          password:"cust2",  joined:"2024-08-15", avatar:null },
];

const SEED_MESSAGES = [
  { id:1, from:"admin", to:"cust-1", subject:"Welcome to the Marketplace!", body:"Welcome! We are glad to have you as part of our community.", date:"2025-04-01", read:true },
];

const STATUS_FLOW  = ["Pending","Processing","In Transit","Delivered"];
const STATUS_STYLE = {
  "Pending":    { bg:"#FEF3C7", color:"#92400E", icon:"⏳" },
  "Processing": { bg:"#FDE8D8", color:"#7C2D12", icon:"⚙️" },
  "In Transit": { bg:"#D1FAE5", color:"#065F46", icon:"🚚" },
  "Delivered":  { bg:"#DCFCE7", color:"#14532D", icon:"✅" },
};

const DELIVERY_FEE = { "Thohoyandou CBD":0, "Sibasa":10, "Shayandima":10, "Makwarela":10, "Tshilamba":20, "Ngovhela":20, "Tshirunzi":25, "Mphephu":25, "Lwamondo":30, "Tshififi":25, "Muledane":15, "Vuwani":40, "Elim":35, "Kutama":35, "Tshirolwe":30, "Matangari":30, "Dzanani":35, "Mutale":45, "Ha-Mashamba":40, "Tshipise":50, "Makhuvha":45, "Bungeni":30, "Folovhodwe":50, "Gondeni":35, "Ha-Mphaphuli":30 };

const fmt = n => `R ${Number(n).toLocaleString("en-ZA",{minimumFractionDigits:2})}`;
const stars = r => r===0 ? "—" : "★".repeat(Math.round(r)) + "☆".repeat(5-Math.round(r));

// ── Toast ─────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return <div className="toast">✨ {msg}</div>;
}

// ══════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [vendors,   setVendors]   = useState(SEED_VENDORS);
  const [products,  setProducts]  = useState(SEED_PRODUCTS);
  const [orders,    setOrders]    = useState(SEED_ORDERS);
  const [customers, setCustomers] = useState(SEED_CUSTOMERS);
  const [messages,  setMessages]  = useState(SEED_MESSAGES);
  const [session,   setSession]   = useState(null);
  const [toast,     setToast]     = useState(null);

  const showToast = msg => { setToast(msg); };
  const ctx = { vendors,setVendors,products,setProducts,orders,setOrders,customers,setCustomers,messages,setMessages,session,setSession,showToast };

  return (
    <>
      <style>{CSS}</style>
      {toast && <Toast msg={toast} onClose={()=>setToast(null)} />}
      {!session                   && <AuthGate    {...ctx} />}
      {session?.role==="customer" && <CustomerApp {...ctx} />}
      {session?.role==="vendor"   && <VendorApp   {...ctx} />}
      {session?.role==="admin"    && <AdminApp    {...ctx} />}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// AUTH GATE — with OTP support
// ══════════════════════════════════════════════════════════════
function AuthGate({ vendors,setVendors,customers,setCustomers,setSession,showToast }) {
  const [mode,    setMode]    = useState("landing");
  const [form,    setForm]    = useState({});
  const [error,   setError]   = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp,     setOtp]     = useState(["","","","",""]);
  const [mockOtp, setMockOtp] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(null);
  const otpRefs = [useRef(),useRef(),useRef(),useRef(),useRef()];

  const f   = (k,v) => setForm(p=>({...p,[k]:v}));
  const go  = m => { setForm({}); setError(""); setOtpSent(false); setOtp(["","","","",""]); setAvatarPrev(null); setMode(m); };
  const otp5 = otp.join("");

  const sendOtp = (email) => {
    const code = String(Math.floor(10000 + Math.random()*90000));
    setMockOtp(code);
    setOtpSent(true);
    showToast(`OTP sent to ${email} — (Demo: ${code})`);
  };

  const handleOtpKey = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val;
    setOtp(next);
    if (val && i < 4) otpRefs[i+1].current?.focus();
    if (!val && i > 0) otpRefs[i-1].current?.focus();
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setAvatarPrev(ev.target.result); f("avatar", ev.target.result); };
    reader.readAsDataURL(file);
  };

  const loginCustomer = () => {
    const c = customers.find(c=>c.email===form.email&&c.password===form.password);
    if (!c) return setError("Invalid email or password.");
    setSession({role:"customer",id:c.id});
  };
  const loginVendor = () => {
    const v = vendors.find(v=>v.email===form.email&&v.password===form.password);
    if (!v) return setError("Invalid email or password.");
    if (v.status==="pending")  return setError("Your account is pending admin approval.");
    if (v.status==="rejected") return setError("Your account was rejected. Contact support.");
    setSession({role:"vendor",id:v.id});
  };
  const loginAdmin = () => {
    if (form.email==="admin@thohoyandou.gov.za"&&form.password==="admin2025") setSession({role:"admin",id:"admin"});
    else setError("Invalid admin credentials.");
  };

  const registerVendor = () => {
    if (!form.businessName||!form.ownerName||!form.email||!form.password||!form.phone||!form.category||!form.village) return setError("Please fill in all required fields.");
    if (!otpSent) return setError("Please verify your phone/email with OTP first.");
    if (otp5 !== mockOtp) return setError("Invalid OTP code. Please check and retry.");
    if (vendors.find(v=>v.email===form.email)) return setError("This email is already registered.");
    setVendors(v=>[...v,{id:Date.now(),businessName:form.businessName,ownerName:form.ownerName,email:form.email,phone:form.phone,category:form.category,description:form.description||"",village:form.village,status:"pending",joined:new Date().toISOString().slice(0,10),password:form.password,avatar:form.avatar||null}]);
    go("reg-done");
  };

  const registerCustomer = () => {
    if (!form.name||!form.email||!form.password||!form.phone||!form.village) return setError("Please fill in all required fields.");
    if (!otpSent) return setError("Please verify your phone number with OTP first.");
    if (otp5 !== mockOtp) return setError("Invalid OTP code. Please check and retry.");
    if (customers.find(c=>c.email===form.email)) return setError("This email is already registered.");
    const nc={id:`cust-${Date.now()}`,name:form.name,email:form.email,phone:form.phone,village:form.village||"",password:form.password,joined:new Date().toISOString().slice(0,10),avatar:form.avatar||null};
    setCustomers(c=>[...c,nc]);
    setSession({role:"customer",id:nc.id});
  };

  // ── Landing ────────────────────────────────────────────────
  if (mode==="landing") return (
    <div className="tri-bg" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px",position:"relative",overflow:"hidden"}}>
      <svg style={{position:"absolute",top:0,right:0,opacity:.08,width:280,pointerEvents:"none"}} viewBox="0 0 280 280">
        <polygon points="280,0 280,280 0,0"   fill={V.terracotta}/>
        <polygon points="280,0 280,190 90,0"  fill={V.gold}/>
        <polygon points="280,0 280,100 180,0" fill={V.ochre}/>
      </svg>
      <svg style={{position:"absolute",bottom:0,left:0,opacity:.08,width:240,pointerEvents:"none"}} viewBox="0 0 240 240">
        <polygon points="0,240 240,240 0,0"   fill={V.clay}/>
        <polygon points="0,240 160,240 0,80"  fill={V.sage}/>
        <polygon points="0,240  70,240 0,170" fill={V.terracotta}/>
      </svg>
      <div className="stripe" style={{position:"absolute",top:0,left:0,right:0}} />

      <div className="fade-up" style={{textAlign:"center",marginBottom:44}}>
        <svg viewBox="0 0 120 120" width="100" height="100" style={{display:"block",margin:"0 auto 16px"}}>
          <polygon points="60,4 114,96 6,96"   fill="none" stroke={V.gold}       strokeWidth="3.5"/>
          <polygon points="60,22 96,88 24,88"  fill="none" stroke={V.terracotta} strokeWidth="2.5"/>
          <polygon points="60,42 80,78 40,78"  fill={V.ochre} opacity=".3"/>
          <circle  cx="60" cy="66" r="13"     fill={V.gold} opacity=".92"/>
          <text x="60" y="71" textAnchor="middle" fontSize="12" fontFamily="Cinzel,serif" fontWeight="700" fill={V.bark}>TM</text>
        </svg>
        <h1 style={{fontFamily:"'Cinzel',serif",color:V.gold,fontSize:36,letterSpacing:5,marginBottom:6,textShadow:`0 2px 30px ${V.ochre}66`}}>THOHOYANDOU</h1>
        <h2 style={{fontFamily:"'Cinzel',serif",color:V.terracotta,fontSize:15,fontWeight:400,letterSpacing:7,marginBottom:16}}>MARKETPLACE</h2>
        <div style={{height:2,background:`linear-gradient(90deg,transparent,${V.gold},transparent)`,maxWidth:260,margin:"0 auto 16px"}} />
        <p style={{color:V.sand,opacity:.7,fontSize:14,fontStyle:"italic",maxWidth:320,margin:"0 auto"}}>Connecting rural vendors &amp; buyers across Limpopo — from Thohoyandou to the valleys</p>
      </div>

      <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:14,width:"100%",maxWidth:380}}>
        {[
          {icon:"🛍️",title:"Shop",         sub:"Browse & buy local products",   color:V.ochre, m:"login-customer"},
          {icon:"🏺",title:"Vendor Portal",sub:"Register or manage your shop",  color:V.sage,  m:"login-vendor"},
          {icon:"🦅",title:"Admin Portal", sub:"Platform oversight & control",  color:V.clay,  m:"login-admin"},
        ].map(b=>(
          <button key={b.m} onClick={()=>go(b.m)}
            style={{background:"rgba(255,255,255,0.05)",border:`2px solid ${b.color}`,borderRadius:4,padding:"16px 22px",cursor:"pointer",display:"flex",alignItems:"center",gap:18,textAlign:"left",width:"100%",transition:"all .22s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=b.color+"22";e.currentTarget.style.transform="translateX(4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.transform="translateX(0)";}}>
            <span style={{fontSize:28}}>{b.icon}</span>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",color:V.cream,fontSize:15,letterSpacing:1.2}}>{b.title}</div>
              <div style={{color:V.muted,fontSize:13,marginTop:3,fontStyle:"italic"}}>{b.sub}</div>
            </div>
            <div style={{marginLeft:"auto",color:b.color,fontSize:18}}>›</div>
          </button>
        ))}
      </div>
      <div className="stripe" style={{position:"absolute",bottom:0,left:0,right:0}} />
      <p style={{color:V.sand,opacity:.2,marginTop:36,fontSize:11,fontFamily:"'Cinzel',serif",letterSpacing:2}}>GROUP 6 · SYSTEM ANALYSIS · 2025</p>
    </div>
  );

  if (mode==="reg-done") return (
    <AuthShell title="" onBack={()=>go("login-vendor")}>
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{fontSize:60,marginBottom:16}}>🎉</div>
        <h3 style={{fontFamily:"'Cinzel',serif",color:V.sage,marginBottom:12,fontSize:18}}>Application Received!</h3>
        <p style={{color:V.muted,fontSize:14,lineHeight:1.8}}>Your business registration is <strong>pending admin approval</strong>. You will receive confirmation once approved.</p>
        <Btn onClick={()=>go("login-vendor")} bg={V.ochre} style={{marginTop:22}}>Back to Vendor Login</Btn>
      </div>
    </AuthShell>
  );

  const role  = mode.split("-")[1];
  const label = {customer:"🛍️ Customer",vendor:"🏺 Vendor",admin:"🦅 Admin"}[role];
  const isReg = mode.startsWith("reg");

  // OTP widget
  const OtpWidget = ({label}) => (
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <input className="vinput" placeholder={label||"Phone number for OTP"} value={form.phone||""} onChange={e=>f("phone",e.target.value)} style={{flex:1}} />
        <Btn onClick={()=>sendOtp(form.phone||form.email)} bg={V.sage} style={{whiteSpace:"nowrap",padding:"9px 14px",fontSize:12}}>{otpSent?"Resend":"Send OTP"}</Btn>
      </div>
      {otpSent && (
        <div className="slide-in">
          <p style={{fontSize:12,color:V.muted,fontStyle:"italic",marginBottom:8}}>Enter the 5-digit code sent to your number:</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:8}}>
            {otp.map((d,i)=>(
              <input key={i} ref={otpRefs[i]} className="otp-box" maxLength={1} value={d}
                onChange={e=>handleOtpKey(i,e.target.value)}
                onKeyDown={e=>{if(e.key==="Backspace"&&!d&&i>0)otpRefs[i-1].current?.focus();}} />
            ))}
          </div>
          {mockOtp && <div style={{textAlign:"center",background:"#FEF3C7",border:`1px dashed ${V.ochre}`,borderRadius:3,padding:"6px 12px",fontSize:12,color:"#92400E",fontFamily:"monospace"}}>Demo OTP: <strong>{mockOtp}</strong></div>}
        </div>
      )}
    </div>
  );

  // Avatar upload
  const AvatarUpload = () => (
    <div style={{marginBottom:14,textAlign:"center"}}>
      <label className="field-label">Profile Photo (optional)</label>
      <label style={{cursor:"pointer",display:"inline-block"}}>
        {avatarPrev
          ? <img src={avatarPrev} alt="avatar" style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",border:`3px solid ${V.gold}`}} />
          : <div style={{width:80,height:80,borderRadius:"50%",background:V.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,border:`2px dashed ${V.border}`,margin:"0 auto"}}>👤</div>}
        <input type="file" accept="image/*" onChange={handleAvatar} style={{display:"none"}} />
        <p style={{fontSize:12,color:V.muted,marginTop:6,fontStyle:"italic"}}>Tap to upload photo</p>
      </label>
    </div>
  );

  return (
    <AuthShell title={`${label} — ${isReg?"Register":"Login"}`} onBack={()=>go("landing")}>
      {error && <div style={{background:"#FEE2E2",border:`1px solid ${V.rust}`,color:V.rust,borderRadius:3,padding:"10px 14px",marginBottom:14,fontSize:13,fontStyle:"italic",display:"flex",alignItems:"center",gap:8}}>⚠️ {error}</div>}

      {/* Customer Login */}
      {mode==="login-customer" && <>
        <FI label="Email"    value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Password" value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={loginCustomer} bg={V.ochre} full>Login →</Btn>
        <Switch label="No account?" link="Register here" onClick={()=>go("reg-customer")} color={V.ochre} />
        <Demo lines={["lufuno@gmail.com / cust1","rendani@gmail.com / cust2"]} />
      </>}

      {/* Customer Register */}
      {mode==="reg-customer" && <>
        <AvatarUpload />
        <FI label="Full Name"   value={form.name||""}     onChange={v=>f("name",v)} />
        <FI label="Email"       value={form.email||""}    onChange={v=>f("email",v)} />
        <FS label="Delivery Village / Area" value={form.village||""} onChange={v=>f("village",v)} opts={["",  ...VILLAGES]} labels={["-- Select your village --",...VILLAGES]} />
        <FI label="Password"    value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <OtpWidget label="Phone number for OTP verification" />
        <Btn onClick={registerCustomer} bg={V.ochre} full>Create Account →</Btn>
        <Switch label="Already registered?" link="Login" onClick={()=>go("login-customer")} color={V.ochre} />
      </>}

      {/* Vendor Login */}
      {mode==="login-vendor" && <>
        <FI label="Business Email" value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Password"       value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={loginVendor} bg={V.sage} full>Login →</Btn>
        <Switch label="New business?" link="Register your shop" onClick={()=>go("reg-vendor")} color={V.sage} />
        <Demo lines={["masindi@gmail.com / vendor1","tshililo@gmail.com / vendor2"]} />
      </>}

      {/* Vendor Register */}
      {mode==="reg-vendor" && <>
        <AvatarUpload />
        <FI label="Business Name"   value={form.businessName||""} onChange={v=>f("businessName",v)} />
        <FI label="Owner Full Name" value={form.ownerName||""}    onChange={v=>f("ownerName",v)} />
        <FI label="Business Email"  value={form.email||""}        onChange={v=>f("email",v)} />
        <FS label="Business Category" value={form.category||"Agriculture"} onChange={v=>f("category",v)} opts={["Agriculture","Food","Handcraft","Electronics","Clothing","Other"]} />
        <FS label="Business Village / Area" value={form.village||""} onChange={v=>f("village",v)} opts={["",...VILLAGES]} labels={["-- Select your village --",...VILLAGES]} />
        <FI label="Business Description" value={form.description||""} onChange={v=>f("description",v)} />
        <FI label="Password" value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <OtpWidget label="Phone number for OTP verification" />
        <Btn onClick={registerVendor} bg={V.sage} full>Submit for Approval →</Btn>
        <Switch label="Already registered?" link="Login" onClick={()=>go("login-vendor")} color={V.sage} />
      </>}

      {/* Admin Login */}
      {mode==="login-admin" && <>
        <FI label="Admin Email"    value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Admin Password" value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={loginAdmin} bg={V.clay} full>Access Portal →</Btn>
        <Demo lines={["admin@thohoyandou.gov.za / admin2025"]} />
      </>}
    </AuthShell>
  );
}

// ══════════════════════════════════════════════════════════════
// CUSTOMER APP
// ══════════════════════════════════════════════════════════════
function CustomerApp({ products,orders,setOrders,customers,session,setSession,messages,setMessages,vendors,showToast }) {
  const [tab,     setTab]     = useState("shop");
  const [search,  setSearch]  = useState("");
  const [catF,    setCatF]    = useState("All");
  const [cart,    setCart]    = useState([]);
  const [step,    setStep]    = useState(0);
  const [trackId, setTrackId] = useState("");
  const [tracked, setTracked] = useState(null);
  const [compose, setCompose] = useState(false);
  const [mf,      setMf]      = useState({subject:"",body:""});
  const [selProd, setSelProd] = useState(null);

  const me       = customers.find(c=>c.id===session.id);
  const myOrders = orders.filter(o=>o.customerId===session.id);
  const myMsgs   = messages.filter(m=>m.to===session.id||m.from===session.id);
  const unread   = myMsgs.filter(m=>m.to===session.id&&!m.read).length;
  const live     = products.filter(p=>{ const v=vendors.find(v=>v.id===p.vendorId); return p.approved&&v?.status==="approved"; });
  const cats     = ["All",...new Set(live.map(p=>p.category))];
  const filtered = live.filter(p=>(catF==="All"||p.category===catF)&&p.name.toLowerCase().includes(search.toLowerCase()));
  const cartTotal= cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount= cart.reduce((s,i)=>s+i.qty,0);
  const delivFee = DELIVERY_FEE[me?.village]??20;

  const addCart = p => { setCart(c=>{ const ex=c.find(i=>i.id===p.id); return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]; }); showToast(`${p.name} added to cart`); };
  const rmCart  = id => setCart(c=>c.filter(i=>i.id!==id));
  const placeOrd= ()=>{ cart.forEach(item=>setOrders(o=>[...o,{id:`ORD-${String(o.length+100).padStart(3,"0")}`,customerId:session.id,customerName:me.name,vendorId:item.vendorId,productId:item.id,qty:item.qty,total:item.price*item.qty,status:"Pending",date:new Date().toISOString().slice(0,10),village:me.village,paymentRef:`PAY-${Math.floor(8000+Math.random()*999)}`}])); setCart([]); setStep(3); showToast("Order placed successfully!"); };
  const sendMsg = ()=>{ setMessages(m=>[...m,{id:Date.now(),from:session.id,to:"admin",subject:mf.subject,body:mf.body,date:new Date().toISOString().slice(0,10),read:false}]); setMf({subject:"",body:""}); setCompose(false); showToast("Message sent!"); };
  const markRead= id=>setMessages(m=>m.map(x=>x.id===id?{...x,read:true}:x));

  return (
    <div style={{minHeight:"100vh",background:V.cream}}>
      <VNav title="🛒 Thohoyandou Marketplace"
        tabs={[["🏠","shop","Shop"],["🛒","cart",`Cart${cartCount>0?` (${cartCount})`:""}  `],["📦","orders","Orders"],["✉️","messages",`Messages${unread>0?` (${unread})`:""}  `]]}
        active={tab} onTab={setTab} onExit={()=>setSession(null)} accent={V.ochre} me={me} />

      {/* Product Detail Modal */}
      {selProd && (
        <div className="modal-overlay" onClick={()=>setSelProd(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="stripe" />
            <div style={{padding:"20px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <h2 style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:18}}>{selProd.name}</h2>
                <button onClick={()=>setSelProd(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:V.muted,lineHeight:1}}>×</button>
              </div>
              <ProductImageGallery product={selProd} height={220} />
              <div style={{marginTop:16}}>
                <p style={{color:V.muted,lineHeight:1.7,fontSize:14,marginBottom:12}}>{selProd.description}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                  <span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,fontSize:22}}>{fmt(selProd.price)}</span>
                  <div style={{fontSize:14,color:V.amber}}>{stars(selProd.rating)} <span style={{color:V.muted,fontSize:12}}>({selProd.reviews} reviews)</span></div>
                </div>
                <div style={{marginTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:13,color:selProd.stock>0?V.sage:V.rust}}>Stock: {selProd.stock}</span>
                  {(() => { const vendor = vendors.find(v=>v.id===selProd.vendorId); return vendor && <span className="village-badge">📍 {vendor.village}</span>; })()}
                </div>
                <Btn onClick={()=>{addCart(selProd);setSelProd(null);}} bg={V.terracotta} full style={{marginTop:16}}>+ Add to Cart</Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{maxWidth:900,margin:"0 auto",padding:"28px 16px"}} className="fade-up">

        {/* SHOP */}
        {tab==="shop" && <>
          <SecHead icon="🏺" title="Products" sub="Fresh from local Venda vendors" />
          <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
            <input className="vinput" placeholder="🔍  Search products..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:180}} />
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
            {cats.map(c=>(
              <button key={c} className="cat-pill" onClick={()=>setCatF(c)}
                style={{background:catF===c?V.terracotta:"transparent",borderColor:V.terracotta,color:catF===c?V.cream:V.terracotta}}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          {filtered.length===0 && <VCard><p style={{padding:30,textAlign:"center",color:V.muted,fontStyle:"italic"}}>No products found matching your search.</p></VCard>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20}}>
            {filtered.map(p=>(
              <div key={p.id} className="product-tile" onClick={()=>setSelProd(p)} style={{cursor:"pointer"}}>
                <div className="product-img">
                  {p.images?.length>0
                    ? <img src={p.images[0]} alt={p.name} />
                    : <div className="emoji-fallback">{p.emoji||"📦"}</div>}
                </div>
                <div style={{padding:"14px 16px 18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                    <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13,fontWeight:600,lineHeight:1.4}}>{p.name}</h3>
                  </div>
                  <div style={{fontSize:12,color:V.amber,marginBottom:6}}>{stars(p.rating)} <span style={{color:V.muted}}>({p.reviews})</span></div>
                  <p style={{color:V.muted,fontSize:12,marginBottom:10,lineHeight:1.5}}>{p.description.slice(0,60)}…</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,fontSize:16}}>{fmt(p.price)}</span>
                    <button className="vbtn" onClick={e=>{e.stopPropagation();addCart(p);}} disabled={p.stock===0} style={{background:V.terracotta,color:V.cream,fontSize:12,padding:"6px 12px",border:"2px solid transparent"}}>+ Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>}

        {/* CART */}
        {tab==="cart" && <>
          <SecHead icon="🛒" title="Your Cart" sub="Review your selected items" />
          {step===3
            ? <VCard style={{textAlign:"center",padding:50}}><div style={{fontSize:60,marginBottom:16}}>🎉</div><h3 style={{fontFamily:"'Cinzel',serif",color:V.sage,marginBottom:10,fontSize:20}}>Order Placed!</h3><p style={{color:V.muted,marginBottom:20}}>Track it under the Orders tab.</p><Btn onClick={()=>{setStep(0);setTab("orders");}} bg={V.ochre}>View My Orders →</Btn></VCard>
            : step===2
            ? <VCard style={{padding:24}}>
                <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16,fontSize:16}}>Payment</h3>
                <div style={{background:"#F0FDF4",border:`2px dashed ${V.sage}`,borderRadius:3,padding:16,marginBottom:16}}>
                  <p style={{fontSize:14,color:V.sage,marginBottom:6}}>✅ Secure simulated payment gateway</p>
                  <p style={{fontSize:13,color:V.muted}}>Items: <strong>{fmt(cartTotal)}</strong> + Delivery to {me?.village}: <strong>{fmt(delivFee)}</strong></p>
                  <p style={{fontFamily:"'Cinzel',serif",color:V.sage,fontWeight:700,fontSize:18,marginTop:8}}>Total: {fmt(cartTotal+delivFee)}</p>
                </div>
                <Row gap={10}><Btn onClick={placeOrd} bg={V.sage}>Confirm & Pay →</Btn><Btn onClick={()=>setStep(1)} bg={V.muted} outline>← Back</Btn></Row>
              </VCard>
            : step===1
            ? <VCard style={{padding:24}}>
                <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:12,fontSize:16}}>Delivery Details</h3>
                <div style={{background:"rgba(61,96,64,.08)",border:`1.5px solid ${V.sage}`,borderRadius:3,padding:14,marginBottom:16}}>
                  <p style={{fontSize:13,color:V.muted,marginBottom:4}}>Delivering to village:</p>
                  <span className="village-badge" style={{fontSize:14,padding:"6px 16px"}}>📍 {me?.village||"Not set"}</span>
                  <p style={{fontSize:13,color:V.muted,marginTop:10}}>Delivery fee: <strong style={{color:V.bark}}>{delivFee===0?"Free":fmt(delivFee)}</strong></p>
                </div>
                <Row gap={10}><Btn onClick={()=>setStep(2)} bg={V.ochre}>Proceed to Payment →</Btn><Btn onClick={()=>setStep(0)} bg={V.muted} outline>← Back</Btn></Row>
              </VCard>
            : cart.length===0
            ? <VCard style={{padding:40,textAlign:"center"}}><p style={{color:V.muted,fontSize:16,fontStyle:"italic"}}>Your cart is empty. Start shopping!</p></VCard>
            : <>
                {cart.map(i=>(
                  <div key={i.id} className="vcard" style={{padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:16}}>
                    <div style={{width:54,height:54,borderRadius:4,overflow:"hidden",background:V.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                      {i.images?.length>0 ? <img src={i.images[0]} alt={i.name} style={{width:"100%",height:"100%",objectFit:"cover"}} /> : i.emoji}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Cinzel',serif",fontWeight:600,color:V.bark,fontSize:14}}>{i.name}</div>
                      <div style={{color:V.ochre,fontSize:13,marginTop:4}}>{fmt(i.price)} × {i.qty} = <strong>{fmt(i.price*i.qty)}</strong></div>
                    </div>
                    <button onClick={()=>rmCart(i.id)} style={{background:"none",border:`1.5px solid ${V.rust}`,color:V.rust,cursor:"pointer",borderRadius:3,padding:"4px 10px",fontSize:13,fontFamily:"'Cinzel',serif"}}>Remove</button>
                  </div>
                ))}
                <div className="vcard" style={{padding:16,marginBottom:16,background:"rgba(238,212,154,.3)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:V.muted,marginBottom:4}}><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:V.muted,marginBottom:8}}><span>Delivery ({me?.village})</span><span>{delivFee===0?"Free":fmt(delivFee)}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Cinzel',serif",fontWeight:700,color:V.bark,fontSize:18}}><span>Total</span><span>{fmt(cartTotal+delivFee)}</span></div>
                </div>
                <Btn onClick={()=>setStep(1)} bg={V.terracotta}>Checkout →</Btn>
              </>
          }
        </>}

        {/* ORDERS */}
        {tab==="orders" && <>
          <SecHead icon="📦" title="My Orders" sub="Track and view your orders" />
          <div style={{display:"flex",gap:10,marginBottom:18}}>
            <input className="vinput" placeholder="Enter Order ID e.g. ORD-001" value={trackId} onChange={e=>setTrackId(e.target.value.toUpperCase())} style={{flex:1}} />
            <Btn onClick={()=>setTracked(orders.find(o=>o.id===trackId)||"none")} bg={V.terracotta}>Track</Btn>
          </div>
          {tracked==="none" && <p style={{color:V.rust,fontStyle:"italic",marginBottom:14}}>⚠️ Order not found.</p>}
          {tracked&&tracked!=="none" && (
            <VCard style={{marginBottom:18,borderLeft:`5px solid ${V.ochre}`,padding:20}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:15}}>{tracked.id}</strong>{SBadge(tracked.status)}</div>
              <span className="village-badge" style={{marginBottom:10,display:"inline-flex"}}>📍 {tracked.village}</span>
              <p style={{fontSize:13,color:V.muted,margin:"8px 0 4px"}}>🧾 {tracked.paymentRef} · 💰 {fmt(tracked.total)}</p>
              <StatusBar status={tracked.status} />
            </VCard>
          )}
          {myOrders.length===0 && <VCard style={{padding:30,textAlign:"center"}}><p style={{color:V.muted,fontStyle:"italic"}}>You have no orders yet.</p></VCard>}
          {myOrders.map(o=>(
            <div key={o.id} className="vcard" style={{padding:16,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{o.id}</strong>
                {SBadge(o.status)}
              </div>
              <div style={{marginTop:8,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
                <span className="village-badge" style={{fontSize:11}}>📍 {o.village}</span>
                <span style={{fontSize:13,color:V.muted}}>💰 {fmt(o.total)} · 📅 {o.date}</span>
              </div>
            </div>
          ))}
        </>}

        {/* MESSAGES */}
        {tab==="messages" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <SecHead icon="✉️" title="Messages" sub="Your conversations with admin" />
            <Btn onClick={()=>setCompose(true)} bg={V.clay}>+ Contact Admin</Btn>
          </div>
          {compose && (
            <VCard style={{marginBottom:18,padding:20}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16}}>New Message to Admin</h3>
              <FI label="Subject" value={mf.subject} onChange={v=>setMf(x=>({...x,subject:v}))} />
              <label className="field-label">Message</label>
              <textarea value={mf.body} onChange={e=>setMf(x=>({...x,body:e.target.value}))} rows={4} className="vinput" style={{resize:"vertical"}} />
              <Row gap={10} style={{marginTop:12}}><Btn onClick={sendMsg} bg={V.clay}>Send</Btn><Btn onClick={()=>setCompose(false)} bg={V.muted} outline>Cancel</Btn></Row>
            </VCard>
          )}
          {myMsgs.slice().reverse().map(m=>(
            <div key={m.id} onClick={()=>markRead(m.id)} className="vcard" style={{padding:16,marginBottom:12,cursor:"pointer",background:(!m.read&&m.to===session.id)?"#FEF9EE":"#fffaf0",borderLeft:`5px solid ${m.from==="admin"?V.clay:V.ochre}`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{!m.read&&m.to===session.id?"🔴 ":""}{m.subject}</strong><span style={{fontSize:11,color:V.muted}}>{m.date}</span></div>
              <p style={{margin:"5px 0 4px",fontSize:12,color:V.muted}}>{m.from==="admin"?"📨 From Admin":"📤 Sent to Admin"}</p>
              <p style={{fontSize:13,color:V.bark,lineHeight:1.6}}>{m.body}</p>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// IMAGE GALLERY component
// ══════════════════════════════════════════════════════════════
function ProductImageGallery({ product, height=160 }) {
  const [active, setActive] = useState(0);
  const imgs = product.images?.filter(Boolean) || [];
  if (imgs.length === 0) {
    return (
      <div style={{height,background:"linear-gradient(135deg,#f5e9cc,#efe0b8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:60,borderRadius:4}}>
        {product.emoji||"📦"}
      </div>
    );
  }
  return (
    <div>
      <div style={{height,borderRadius:4,overflow:"hidden",background:V.sand}}>
        <img src={imgs[active]} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} />
      </div>
      {imgs.length>1 && (
        <div className="img-strip">
          {imgs.map((img,i)=>(
            <img key={i} src={img} alt="" className={`img-thumb ${i===active?"active":""}`} onClick={()=>setActive(i)} onError={e=>e.target.style.display="none"} />
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// IMAGE UPLOAD PANEL for vendors
// ══════════════════════════════════════════════════════════════
function ImageUploadPanel({ images, setImages }) {
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef();

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setImages(imgs=>[...imgs, ev.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    setImages(imgs=>[...imgs, urlInput.trim()]);
    setUrlInput("");
  };

  return (
    <div style={{marginBottom:14}}>
      <label className="field-label">Product Images</label>

      {/* Upload zone */}
      <div className="img-upload-zone" onClick={()=>fileRef.current?.click()}>
        <div style={{fontSize:30,marginBottom:6}}>📷</div>
        <p style={{fontSize:13,color:V.muted,fontStyle:"italic"}}>Click to upload from device</p>
        <p style={{fontSize:11,color:V.muted,opacity:.7}}>JPG, PNG, WEBP supported</p>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFile} style={{display:"none"}} />
      </div>

      {/* URL input */}
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <input className="vinput" placeholder="Or paste image URL from the web..." value={urlInput} onChange={e=>setUrlInput(e.target.value)} style={{flex:1}} />
        <Btn onClick={addUrl} bg={V.sage} style={{padding:"9px 14px",fontSize:12}}>Add URL</Btn>
      </div>

      {/* Preview */}
      {images.length>0 && (
        <div className="img-strip">
          {images.map((img,i)=>(
            <div key={i} style={{position:"relative",display:"inline-block"}}>
              <img src={img} alt="" className="img-thumb" onError={e=>{e.target.style.opacity=".3";}} />
              <button onClick={()=>setImages(imgs=>imgs.filter((_,j)=>j!==i))} style={{position:"absolute",top:-6,right:-6,background:V.rust,border:"none",color:"white",borderRadius:"50%",width:18,height:18,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// VENDOR APP
// ══════════════════════════════════════════════════════════════
function VendorApp({ vendors,products,setProducts,orders,setOrders,session,setSession,showToast }) {
  const [tab,    setTab]    = useState("overview");
  const [showF,  setShowF]  = useState(false);
  const [pf,     setPf]     = useState({name:"",price:"",stock:"",category:"Food",description:"",emoji:"📦"});
  const [pImgs,  setPImgs]  = useState([]);
  const EMOJIS = ["📦","🥦","🌿","🎭","🧺","🌶️","🔦","🔋","👕","🍯","🐄","🌽","🥕","🧅","🍠","🫙"];

  const me      = vendors.find(v=>v.id===session.id);
  const myProds = products.filter(p=>p.vendorId===session.id);
  const myOrds  = orders.filter(o=>o.vendorId===session.id);
  const revenue = myOrds.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0);

  const addProd = ()=>{
    if(!pf.name||!pf.price||!pf.stock) return;
    setProducts(p=>[...p,{id:Date.now(),vendorId:session.id,name:pf.name,price:parseFloat(pf.price),stock:parseInt(pf.stock),category:pf.category,emoji:pf.emoji||"📦",description:pf.description,approved:false,images:pImgs,rating:0,reviews:0}]);
    setPf({name:"",price:"",stock:"",category:"Food",description:"",emoji:"📦"});
    setPImgs([]);
    setShowF(false);
    showToast("Product submitted for approval!");
  };
  const delProd  = id=>{setProducts(p=>p.filter(x=>x.id!==id));showToast("Product removed.");};
  const advOrder = id=>setOrders(o=>o.map(x=>{ if(x.id!==id)return x; const i=STATUS_FLOW.indexOf(x.status); return i<STATUS_FLOW.length-1?{...x,status:STATUS_FLOW[i+1]}:x; }));

  return (
    <div style={{minHeight:"100vh",background:V.cream}}>
      <VNav title={`🏺 ${me?.businessName}`}
        tabs={[["📊","overview","Overview"],["📦","products","Products"],["📋","orders","Orders"]]}
        active={tab} onTab={setTab} onExit={()=>setSession(null)} accent={V.sage} me={me} />
      <div style={{maxWidth:860,margin:"0 auto",padding:"28px 16px"}} className="fade-up">

        {tab==="overview" && <>
          <SecHead icon="📊" title="Dashboard" sub="Your shop performance at a glance" />
          {me?.village && <div style={{marginBottom:18}}><span className="village-badge">📍 Based in {me.village}</span></div>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
            {[{l:"Revenue",v:fmt(revenue),c:V.ochre,i:"💰"},{l:"Products",v:myProds.length,c:V.sage,i:"🏺"},{l:"Orders",v:myOrds.length,c:V.clay,i:"📋"},{l:"Pending Approval",v:myProds.filter(p=>!p.approved).length,c:V.rust,i:"⏳"}].map(s=><StatCard key={s.l} {...s} />)}
          </div>
          {myProds.filter(p=>!p.approved).length>0 && (
            <div style={{background:"#FEF3C7",border:`2px dashed ${V.ochre}`,borderRadius:3,padding:14,marginBottom:18,fontSize:13,color:"#92400E",fontStyle:"italic"}}>
              ⏳ {myProds.filter(p=>!p.approved).length} product(s) awaiting admin approval before going live.
            </div>
          )}
          <hr className="vdivider" />
          <h3 style={{fontFamily:"'Cinzel',serif",color:V.earth,marginBottom:14}}>Recent Orders</h3>
          {myOrds.length===0 && <p style={{color:V.muted,fontStyle:"italic",fontSize:14}}>No orders yet.</p>}
          {myOrds.slice(-4).reverse().map(o=>(
            <div key={o.id} className="vcard" style={{padding:14,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div><strong style={{fontFamily:"'Cinzel',serif",fontSize:13,color:V.bark}}>{o.id}</strong><span style={{color:V.muted,fontSize:13,marginLeft:8}}>{o.customerName}</span></div>
              <Row gap={10}><span className="village-badge" style={{fontSize:11}}>📍 {o.village}</span><span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700}}>{fmt(o.total)}</span>{SBadge(o.status)}</Row>
            </div>
          ))}
        </>}

        {tab==="products" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <SecHead icon="📦" title="My Products" sub="Manage your product listings" />
            <Btn onClick={()=>setShowF(true)} bg={V.terracotta}>+ Upload Product</Btn>
          </div>
          {showF && (
            <VCard style={{marginBottom:22,padding:22}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16}}>Upload New Product</h3>
              <label className="field-label">Choose an icon (fallback)</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                {EMOJIS.map(e=><button key={e} onClick={()=>setPf(p=>({...p,emoji:e}))} style={{fontSize:22,background:pf.emoji===e?V.sand:"#f5e9cc",border:pf.emoji===e?`2px solid ${V.terracotta}`:"2px solid transparent",borderRadius:3,padding:"5px 9px",cursor:"pointer"}}>{e}</button>)}
              </div>
              <ImageUploadPanel images={pImgs} setImages={setPImgs} />
              <FI label="Product Name" value={pf.name} onChange={v=>setPf(p=>({...p,name:v}))} />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <FI label="Price (R)" type="number" value={pf.price}  onChange={v=>setPf(p=>({...p,price:v}))} />
                <FI label="Stock Qty"  type="number" value={pf.stock}  onChange={v=>setPf(p=>({...p,stock:v}))} />
              </div>
              <FS label="Category" value={pf.category} onChange={v=>setPf(p=>({...p,category:v}))} opts={["Agriculture","Food","Handcraft","Electronics","Clothing","Other"]} />
              <FI label="Description" value={pf.description} onChange={v=>setPf(p=>({...p,description:v}))} />
              <Row gap={10} style={{marginTop:14}}>
                <Btn onClick={addProd} bg={V.sage}>Submit for Approval</Btn>
                <Btn onClick={()=>{setShowF(false);setPImgs([]);}} bg={V.muted} outline>Cancel</Btn>
              </Row>
              <p style={{fontSize:12,color:V.muted,marginTop:10,fontStyle:"italic"}}>Products require admin approval before appearing in the marketplace.</p>
            </VCard>
          )}
          {myProds.map(p=>(
            <div key={p.id} className="vcard" style={{padding:16,marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:54,height:54,borderRadius:4,overflow:"hidden",background:V.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                {p.images?.length>0 ? <img src={p.images[0]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} /> : p.emoji}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Cinzel',serif",fontWeight:600,color:V.bark,fontSize:14}}>{p.name}</div>
                <div style={{color:V.muted,fontSize:12,marginTop:3}}>{p.category} · Stock: {p.stock} · {p.images?.length>0?`${p.images.length} photo(s)`:""}</div>
              </div>
              <span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,marginRight:8}}>{fmt(p.price)}</span>
              <span style={{fontSize:12,background:p.approved?"#D1FAE5":"#FEF3C7",color:p.approved?V.sage:"#92400E",borderRadius:2,padding:"3px 10px",fontWeight:700}}>{p.approved?"✅ Live":"⏳ Pending"}</span>
              <button onClick={()=>delProd(p.id)} style={{background:"none",border:`1.5px solid ${V.rust}`,color:V.rust,cursor:"pointer",borderRadius:3,padding:"4px 9px",marginLeft:6}}>🗑</button>
            </div>
          ))}
        </>}

        {tab==="orders" && <>
          <SecHead icon="📋" title="Orders" sub="Customer orders for your products" />
          {myOrds.length===0 && <VCard style={{padding:30,textAlign:"center"}}><p style={{color:V.muted,fontStyle:"italic"}}>No orders received yet.</p></VCard>}
          {myOrds.map(o=>(
            <VCard key={o.id} style={{padding:18,marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14}}>{o.id}</strong>{SBadge(o.status)}</div>
              <p style={{margin:"3px 0",fontSize:13,color:V.muted}}>👤 {o.customerName}</p>
              <div style={{margin:"6px 0",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                <span className="village-badge">📍 {o.village}</span>
                <span style={{fontSize:13,color:V.muted}}>🧾 {o.paymentRef} · 💰 {fmt(o.total)} · 📅 {o.date}</span>
              </div>
              {o.status!=="Delivered" && <Btn onClick={()=>{advOrder(o.id);showToast("Order status updated!");}} bg={V.sage} style={{marginTop:10,fontSize:12,padding:"7px 14px"}}>Advance → {STATUS_FLOW[STATUS_FLOW.indexOf(o.status)+1]}</Btn>}
            </VCard>
          ))}
        </>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ADMIN APP
// ══════════════════════════════════════════════════════════════
function AdminApp({ vendors,setVendors,products,setProducts,orders,setOrders,customers,messages,setMessages,session,setSession,showToast }) {
  const [tab,      setTab]      = useState("overview");
  const [selMsg,   setSelMsg]   = useState(null);
  const [replyF,   setReplyF]   = useState({to:"",subject:"",body:""});
  const [composeO, setComposeO] = useState(false);

  const pendV   = vendors.filter(v=>v.status==="pending");
  const pendP   = products.filter(p=>!p.approved);
  const delOrds = orders.filter(o=>o.status==="Delivered");
  const revenue = delOrds.reduce((s,o)=>s+o.total,0);
  const inboxMs = messages.filter(m=>m.to==="admin");
  const unread  = inboxMs.filter(m=>!m.read).length;

  const approveV  = id=>{setVendors(v=>v.map(x=>x.id===id?{...x,status:"approved"}:x));showToast("Vendor approved!");};
  const rejectV   = id=>{setVendors(v=>v.map(x=>x.id===id?{...x,status:"rejected"}:x));showToast("Vendor rejected.");};
  const approveP  = id=>{setProducts(p=>p.map(x=>x.id===id?{...x,approved:true}:x));showToast("Product approved & live!");};
  const rejectP   = id=>{setProducts(p=>p.filter(x=>x.id!==id));showToast("Product removed.");};
  const delOrder  = id=>setOrders(o=>o.filter(x=>x.id!==id));
  const delAllDel = ()=>{setOrders(o=>o.filter(x=>x.status!=="Delivered"));showToast("Cleared all delivered orders.");};
  const markRead  = id=>setMessages(m=>m.map(x=>x.id===id?{...x,read:true}:x));
  const sendReply = ()=>{ setMessages(m=>[...m,{id:Date.now(),from:"admin",to:replyF.to,subject:replyF.subject,body:replyF.body,date:new Date().toISOString().slice(0,10),read:false}]); setReplyF({to:"",subject:"",body:""}); setComposeO(false); setSelMsg(null); showToast("Message sent!"); };

  const navTabs=[
    ["📊","overview","Overview"],
    ["🏪","vendors", `Vendors${pendV.length>0?` (${pendV.length})`:""}  `],
    ["📦","products",`Products${pendP.length>0?` (${pendP.length})`:""}  `],
    ["📋","orders",  "Orders"],
    ["✉️","messages",`Messages${unread>0?` (${unread})`:""}  `],
    ["👥","customers","Customers"],
  ];

  // Village delivery heatmap
  const villageStats = VILLAGES.map(v=>({
    name:v,
    orders:orders.filter(o=>o.village===v).length,
    revenue:orders.filter(o=>o.village===v&&o.status==="Delivered").reduce((s,o)=>s+o.total,0),
  })).filter(v=>v.orders>0).sort((a,b)=>b.orders-a.orders);

  return (
    <div style={{minHeight:"100vh",background:V.cream}}>
      <VNav title="🦅 Admin Portal" tabs={navTabs} active={tab} onTab={setTab} onExit={()=>setSession(null)} accent={V.clay} />
      <div style={{maxWidth:960,margin:"0 auto",padding:"28px 16px"}} className="fade-up">

        {/* OVERVIEW */}
        {tab==="overview" && <>
          <SecHead icon="📊" title="Platform Overview" sub="Marketplace-wide statistics" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14,marginBottom:26}}>
            {[
              {l:"Total Revenue",    v:fmt(revenue),                                    c:V.ochre,  i:"💰"},
              {l:"Active Vendors",   v:vendors.filter(v=>v.status==="approved").length, c:V.sage,   i:"🏪"},
              {l:"Pending Vendors",  v:pendV.length,                                    c:V.rust,   i:"⏳"},
              {l:"Live Products",    v:products.filter(p=>p.approved).length,           c:V.clay,   i:"🏺"},
              {l:"Pending Products", v:pendP.length,                                    c:V.rust,   i:"⏳"},
              {l:"Total Orders",     v:orders.length,                                   c:V.earth,  i:"📋"},
              {l:"Delivered",        v:delOrds.length,                                  c:V.sage,   i:"✅"},
              {l:"Customers",        v:customers.length,                                c:V.clay,   i:"👥"},
            ].map(s=><StatCard key={s.l} {...s} top />)}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:20,flexWrap:"wrap"}}>
            <VCard style={{padding:20}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16,fontSize:14}}>Order Status Breakdown</h3>
              {STATUS_FLOW.map(s=>{ const cnt=orders.filter(o=>o.status===s).length; const pct=orders.length?Math.round(cnt/orders.length*100):0; return (
                <div key={s} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,color:V.earth}}>{STATUS_STYLE[s].icon} {s}</span><span style={{fontSize:12,color:V.muted}}>{cnt} ({pct}%)</span></div>
                  <div className="prog-bar"><div className="prog-fill" style={{width:`${pct}%`}} /></div>
                </div>
              );})}
            </VCard>
            <VCard style={{padding:20}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16,fontSize:14}}>Top Delivery Villages</h3>
              {villageStats.length===0 && <p style={{color:V.muted,fontSize:13,fontStyle:"italic"}}>No delivery data yet.</p>}
              {villageStats.slice(0,6).map(v=>(
                <div key={v.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"6px 0",borderBottom:`1px solid ${V.border}33`}}>
                  <span className="village-badge" style={{fontSize:11}}>📍 {v.name}</span>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:12,fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700}}>{fmt(v.revenue)}</div>
                    <div style={{fontSize:11,color:V.muted}}>{v.orders} order(s)</div>
                  </div>
                </div>
              ))}
            </VCard>
          </div>
        </>}

        {/* VENDORS */}
        {tab==="vendors" && <>
          <SecHead icon="🏪" title="Vendor Management" sub="Approve registrations & manage vendors" />
          {pendV.length>0 && <>
            <h3 style={{fontFamily:"'Cinzel',serif",color:V.rust,marginBottom:14,fontSize:15}}>⏳ Pending Approval ({pendV.length})</h3>
            {pendV.map(v=>(
              <VCard key={v.id} style={{padding:20,marginBottom:14,borderLeft:`5px solid ${V.gold}`}}>
                <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  {v.avatar && <img src={v.avatar} alt={v.ownerName} style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",border:`2px solid ${V.gold}`,flexShrink:0}} />}
                  <div style={{flex:1}}>
                    <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:15}}>{v.businessName}</strong>
                    <Tag>{v.category}</Tag>
                    {v.village && <span className="village-badge" style={{fontSize:11,marginLeft:8}}>📍 {v.village}</span>}
                    <p style={{margin:"6px 0 3px",fontSize:13,color:V.muted}}>👤 {v.ownerName} · 📧 {v.email} · 📞 {v.phone}</p>
                    <p style={{margin:"3px 0",fontSize:13,color:V.muted,fontStyle:"italic"}}>{v.description}</p>
                    <p style={{margin:"3px 0",fontSize:12,color:V.muted}}>Registered: {v.joined}</p>
                  </div>
                  <Row gap={8} style={{alignSelf:"flex-start",flexShrink:0}}>
                    <Btn onClick={()=>approveV(v.id)} bg={V.sage}>✅ Approve</Btn>
                    <Btn onClick={()=>rejectV(v.id)}  bg={V.rust} outline>❌ Reject</Btn>
                  </Row>
                </div>
              </VCard>
            ))}
            <hr className="vdivider" />
          </>}
          <h3 style={{fontFamily:"'Cinzel',serif",color:V.earth,marginBottom:14,fontSize:15}}>All Vendors</h3>
          {vendors.map(v=>{ const vOs=orders.filter(o=>o.vendorId===v.id); const vR=vOs.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0); const sc={approved:V.sage,pending:V.ochre,rejected:V.rust}[v.status]; return (
            <div key={v.id} className="vcard" style={{padding:18,marginBottom:12,borderLeft:`5px solid ${sc}`}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  {v.avatar && <img src={v.avatar} alt={v.ownerName} style={{width:44,height:44,borderRadius:"50%",objectFit:"cover",border:`2px solid ${sc}`,flexShrink:0}} />}
                  <div>
                    <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14}}>{v.businessName}</strong>
                    <span style={{marginLeft:8,fontSize:11,background:`${sc}22`,color:sc,borderRadius:2,padding:"2px 8px",fontWeight:700,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{v.status.toUpperCase()}</span>
                    {v.village && <><br/><span className="village-badge" style={{fontSize:11,marginTop:5,display:"inline-flex"}}>📍 {v.village}</span></>}
                    <p style={{margin:"5px 0 3px",fontSize:13,color:V.muted}}>👤 {v.ownerName} · 📧 {v.email}</p>
                    <Row gap={16} style={{marginTop:8,flexWrap:"wrap"}}>
                      <span style={{fontSize:13,fontFamily:"'Cinzel',serif",color:V.ochre}}>{fmt(vR)}</span>
                      <span style={{fontSize:13,color:V.clay}}>{vOs.length} orders</span>
                      <span style={{fontSize:13,color:V.sage}}>{products.filter(p=>p.vendorId===v.id&&p.approved).length} products</span>
                    </Row>
                  </div>
                </div>
                <div>
                  {v.status==="approved" && <Btn onClick={()=>rejectV(v.id)} bg={V.rust} outline>Suspend</Btn>}
                  {v.status==="rejected" && <Btn onClick={()=>approveV(v.id)} bg={V.sage}>Reinstate</Btn>}
                </div>
              </div>
            </div>
          );})}
        </>}

        {/* PRODUCTS */}
        {tab==="products" && <>
          <SecHead icon="📦" title="Product Approvals" sub="Review and approve vendor product listings" />
          {pendP.length>0 && <>
            <h3 style={{fontFamily:"'Cinzel',serif",color:V.rust,marginBottom:14,fontSize:15}}>⏳ Pending Approval ({pendP.length})</h3>
            {pendP.map(p=>{ const vnd=vendors.find(v=>v.id===p.vendorId); return (
              <VCard key={p.id} style={{padding:18,marginBottom:14,borderLeft:`5px solid ${V.gold}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
                  <Row gap={14} style={{alignItems:"flex-start"}}>
                    <div style={{width:70,height:70,borderRadius:4,overflow:"hidden",background:V.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0}}>
                      {p.images?.length>0 ? <img src={p.images[0]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} /> : p.emoji}
                    </div>
                    <div>
                      <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14}}>{p.name}</strong>
                      {p.images?.length>0 && <span style={{marginLeft:8,fontSize:11,color:V.muted}}>{p.images.length} photo(s)</span>}
                      <p style={{margin:"3px 0",fontSize:13,color:V.muted}}>{p.category} · {fmt(p.price)} · Stock: {p.stock}</p>
                      <p style={{margin:"3px 0",fontSize:12,color:V.muted}}>Vendor: <em>{vnd?.businessName}</em></p>
                      {vnd?.village && <span className="village-badge" style={{fontSize:11,marginTop:4,display:"inline-flex"}}>📍 {vnd.village}</span>}
                      <p style={{margin:"6px 0 0",fontSize:12,color:V.muted,fontStyle:"italic"}}>{p.description}</p>
                    </div>
                  </Row>
                  <Row gap={8}>
                    <Btn onClick={()=>approveP(p.id)} bg={V.sage}>✅ Approve</Btn>
                    <Btn onClick={()=>rejectP(p.id)}  bg={V.rust} outline>❌ Reject</Btn>
                  </Row>
                </div>
                {p.images?.length>1 && (
                  <div className="img-strip" style={{marginTop:10}}>
                    {p.images.map((img,i)=><img key={i} src={img} alt="" className="img-thumb" onError={e=>e.target.style.display="none"} />)}
                  </div>
                )}
              </VCard>
            );})}
            <hr className="vdivider" />
          </>}
          <h3 style={{fontFamily:"'Cinzel',serif",color:V.earth,marginBottom:14,fontSize:15}}>Live Products</h3>
          {products.filter(p=>p.approved).map(p=>{ const vnd=vendors.find(v=>v.id===p.vendorId); return (
            <div key={p.id} className="vcard" style={{padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:50,height:50,borderRadius:4,overflow:"hidden",background:V.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>
                {p.images?.length>0 ? <img src={p.images[0]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} /> : p.emoji}
              </div>
              <div style={{flex:1}}>
                <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{p.name}</strong>
                <div style={{fontSize:12,color:V.muted,marginTop:2}}>{vnd?.businessName} · {p.category} · Stock: {p.stock}</div>
              </div>
              <span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,fontSize:14}}>{fmt(p.price)}</span>
              <button onClick={()=>rejectP(p.id)} style={{background:"none",border:`1.5px solid ${V.rust}`,color:V.rust,cursor:"pointer",borderRadius:3,padding:"4px 9px",marginLeft:8}}>🗑</button>
            </div>
          );})}
        </>}

        {/* ORDERS */}
        {tab==="orders" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:20}}>
            <SecHead icon="📋" title="All Orders" sub="Full order management & cleanup" />
            {delOrds.length>0 && <Btn onClick={delAllDel} bg={V.rust}>🗑 Clear Delivered ({delOrds.length})</Btn>}
          </div>
          <div style={{overflowX:"auto",borderRadius:4,boxShadow:"0 2px 14px rgba(122,46,14,.14)"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:640}}>
              <thead>
                <tr className="weave-bg">
                  {["Order","Customer","Village","Vendor","Total","Date","Status","Action"].map(h=>(
                    <th key={h} style={{padding:"12px 14px",textAlign:"left",color:V.gold,fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:1.2,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o,i)=>{ const vnd=vendors.find(v=>v.id===o.vendorId); return (
                  <tr key={o.id} className="trow" style={{background:i%2===0?"#fffaf0":V.cream,borderBottom:`1px solid ${V.border}`}}>
                    <td style={{padding:"10px 14px",fontFamily:"'Cinzel',serif",color:V.bark,fontSize:12,fontWeight:700}}>{o.id}</td>
                    <td style={{padding:"10px 14px",color:V.muted,fontSize:13}}>{o.customerName}</td>
                    <td style={{padding:"10px 14px"}}><span className="village-badge" style={{fontSize:11}}>📍 {o.village}</span></td>
                    <td style={{padding:"10px 14px",color:V.muted,fontSize:13}}>{vnd?.businessName}</td>
                    <td style={{padding:"10px 14px",fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,fontSize:13}}>{fmt(o.total)}</td>
                    <td style={{padding:"10px 14px",color:V.muted,fontSize:13}}>{o.date}</td>
                    <td style={{padding:"10px 14px"}}>{SBadge(o.status)}</td>
                    <td style={{padding:"10px 14px"}}>
                      {o.status==="Delivered"
                        ? <button onClick={()=>delOrder(o.id)} style={{background:"none",border:`1.5px solid ${V.rust}`,color:V.rust,borderRadius:3,padding:"4px 10px",cursor:"pointer",fontSize:12,fontFamily:"'Cinzel',serif"}}>🗑 Remove</button>
                        : <span style={{fontSize:12,color:V.muted,fontStyle:"italic"}}>Active</span>}
                    </td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        </>}

        {/* MESSAGES */}
        {tab==="messages" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:20}}>
            <SecHead icon="✉️" title="Customer Messages" sub="Read and respond to customer enquiries" />
            <Btn onClick={()=>{setComposeO(true);setSelMsg(null);}} bg={V.clay}>+ Compose</Btn>
          </div>
          {composeO && (
            <VCard style={{padding:20,marginBottom:18}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16}}>Send Message to Customer</h3>
              <FS label="Send To" value={replyF.to} onChange={v=>setReplyF(f=>({...f,to:v}))} opts={customers.map(c=>c.id)} labels={customers.map(c=>`${c.name} (${c.email})`)} />
              <FI label="Subject" value={replyF.subject} onChange={v=>setReplyF(f=>({...f,subject:v}))} />
              <label className="field-label">Message</label>
              <textarea value={replyF.body} onChange={e=>setReplyF(f=>({...f,body:e.target.value}))} rows={4} className="vinput" style={{resize:"vertical"}} />
              <Row gap={10} style={{marginTop:12}}><Btn onClick={sendReply} bg={V.clay}>Send Message</Btn><Btn onClick={()=>setComposeO(false)} bg={V.muted} outline>Cancel</Btn></Row>
            </VCard>
          )}
          {selMsg && (
            <VCard style={{padding:20,marginBottom:18,borderLeft:`5px solid ${V.clay}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <strong style={{fontFamily:"'Cinzel',serif",color:V.bark}}>{selMsg.subject}</strong>
                <button onClick={()=>setSelMsg(null)} style={{background:"none",border:"none",cursor:"pointer",color:V.muted,fontSize:22,lineHeight:1}}>×</button>
              </div>
              <p style={{fontSize:13,color:V.muted,marginBottom:10}}>From: {customers.find(c=>c.id===selMsg.from)?.name||selMsg.from} · {selMsg.date}</p>
              <p style={{fontSize:14,color:V.bark,lineHeight:1.8,marginBottom:16}}>{selMsg.body}</p>
              <Btn onClick={()=>{setReplyF({to:selMsg.from,subject:`Re: ${selMsg.subject}`,body:""});setComposeO(true);setSelMsg(null);}} bg={V.clay}>Reply</Btn>
            </VCard>
          )}
          {inboxMs.length===0
            ? <VCard style={{padding:30,textAlign:"center"}}><p style={{color:V.muted,fontStyle:"italic"}}>No messages yet.</p></VCard>
            : inboxMs.slice().reverse().map(m=>(
              <div key={m.id} onClick={()=>{markRead(m.id);setSelMsg(m);}} className="vcard" style={{padding:16,marginBottom:12,cursor:"pointer",background:m.read?"#fffaf0":"#FEF9EE",borderLeft:`5px solid ${m.read?V.border:V.gold}`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{!m.read?"🔴 ":""}{m.subject}</strong><span style={{fontSize:11,color:V.muted}}>{m.date}</span></div>
                <p style={{margin:"5px 0 4px",fontSize:13,color:V.muted}}>From: {customers.find(c=>c.id===m.from)?.name||"Unknown"}</p>
                <p style={{margin:"4px 0 0",fontSize:13,color:V.bark,lineHeight:1.6}}>{m.body.slice(0,100)}{m.body.length>100?"…":""}</p>
              </div>
            ))}
        </>}

        {/* CUSTOMERS */}
        {tab==="customers" && <>
          <SecHead icon="👥" title="Registered Customers" sub="View customer activity and village distribution" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:20}}>
            {VILLAGES.filter(v=>customers.some(c=>c.village===v)).map(v=>(
              <div key={v} style={{background:"rgba(61,96,64,.08)",border:`1px solid ${V.sage}44`,borderRadius:3,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:V.sage,fontFamily:"'Cinzel',serif",fontWeight:600}}>{v}</span>
                <span style={{fontSize:14,fontWeight:700,color:V.bark}}>{customers.filter(c=>c.village===v).length}</span>
              </div>
            ))}
          </div>
          {customers.map(c=>{ const cOs=orders.filter(o=>o.customerId===c.id); const cSp=cOs.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0); return (
            <div key={c.id} className="vcard" style={{padding:18,marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  {c.avatar
                    ? <img src={c.avatar} alt={c.name} style={{width:50,height:50,borderRadius:"50%",objectFit:"cover",border:`2px solid ${V.gold}`,flexShrink:0}} />
                    : <div style={{width:50,height:50,borderRadius:"50%",background:V.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:`2px solid ${V.border}`,flexShrink:0}}>👤</div>}
                  <div>
                    <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14}}>{c.name}</strong>
                    <p style={{margin:"4px 0 3px",fontSize:13,color:V.muted}}>📧 {c.email} · 📞 {c.phone}</p>
                    {c.village && <span className="village-badge" style={{fontSize:11}}>📍 {c.village}</span>}
                    <Row gap={14} style={{marginTop:8,flexWrap:"wrap"}}>
                      <span style={{fontSize:13,fontFamily:"'Cinzel',serif",color:V.ochre}}>{fmt(cSp)} spent</span>
                      <span style={{fontSize:13,color:V.clay}}>{cOs.length} orders</span>
                      <span style={{fontSize:12,color:V.muted,fontStyle:"italic"}}>Joined {c.joined}</span>
                    </Row>
                  </div>
                </div>
                <Btn onClick={()=>{setReplyF({to:c.id,subject:"",body:""});setComposeO(true);setTab("messages");}} bg={V.clay} style={{alignSelf:"flex-start"}}>✉️ Message</Btn>
              </div>
            </div>
          );})}
        </>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SHARED MICRO-COMPONENTS
// ══════════════════════════════════════════════════════════════

function VNav({ title, tabs, active, onTab, onExit, accent, me }) {
  return (
    <nav className="diamond-bg" style={{position:"sticky",top:0,zIndex:100}}>
      <div className="stripe-sm" />
      <div style={{maxWidth:960,margin:"0 auto",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {me?.avatar && <img src={me.avatar} alt="" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover",border:`2px solid ${V.gold}`}} />}
          <span style={{fontFamily:"'Cinzel',serif",color:V.gold,fontSize:14,letterSpacing:1.5}}>{title}</span>
          {me?.village && <span style={{fontSize:11,color:V.sand,opacity:.6,fontStyle:"italic"}}>📍 {me.village}</span>}
        </div>
        <div style={{display:"flex",gap:2,flexWrap:"wrap",alignItems:"center"}}>
          {tabs.map(([icon,t,label])=>(
            <button key={t} onClick={()=>onTab(t)} style={{background:active===t?accent:"transparent",border:"none",color:active===t?V.cream:V.sand,borderRadius:3,padding:"8px 13px",cursor:"pointer",fontFamily:active===t?"'Cinzel',serif":"'Lora',serif",fontSize:13,fontWeight:active===t?700:400,letterSpacing:active===t?.5:0,transition:"all .16s",borderBottom:active===t?`3px solid ${V.gold}`:"3px solid transparent"}}>
              {icon} {label}
            </button>
          ))}
          <button onClick={onExit} style={{background:"transparent",border:`1.5px solid ${V.muted}`,color:V.muted,borderRadius:3,padding:"6px 12px",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:1.5,marginLeft:6,transition:"all .16s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=V.rust;e.currentTarget.style.color=V.rust;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=V.muted;e.currentTarget.style.color=V.muted;}}>EXIT</button>
        </div>
      </div>
      <div className="stripe-sm" />
    </nav>
  );
}

function AuthShell({ title, onBack, children }) {
  return (
    <div className="tri-bg" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="vcard fade-up" style={{width:"100%",maxWidth:450,padding:30}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:V.muted,cursor:"pointer",fontSize:13,marginBottom:14,padding:0,fontStyle:"italic",fontFamily:"'Lora',serif",display:"flex",alignItems:"center",gap:4}}>← Back</button>
        {title && <h2 style={{fontFamily:"'Cinzel',serif",color:V.earth,margin:"0 0 22px",fontSize:17,letterSpacing:1}}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

function VCard({ children, style }) {
  return <div className="vcard" style={{...style}}>{children}</div>;
}

function Btn({ children, onClick, bg, outline, full, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button className="vbtn" onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: outline ? (hov ? bg+"22" : "transparent") : hov ? bg+"dd" : bg,
        borderColor: bg,
        color: outline ? bg : V.cream,
        width: full ? "100%" : undefined,
        justifyContent: full ? "center" : undefined,
        ...style
      }}>
      {children}
    </button>
  );
}

function FI({ label, value, onChange, type="text" }) {
  return (
    <div className="field-wrap">
      {label && <label className="field-label">{label}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} className="vinput" />
    </div>
  );
}

function FS({ label, value, onChange, opts, labels }) {
  return (
    <div className="field-wrap">
      {label && <label className="field-label">{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} className="vinput">
        {opts.map((o,i)=><option key={o} value={o}>{labels?.[i]||o}</option>)}
      </select>
    </div>
  );
}

function SecHead({ icon, title, sub }) {
  return (
    <div style={{marginBottom:22}}>
      <h2 style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:22,margin:"0 0 5px",letterSpacing:1}}>{icon} {title}</h2>
      <p style={{color:V.muted,fontSize:14,margin:"0 0 12px",fontStyle:"italic"}}>{sub}</p>
      <div style={{height:3,background:`linear-gradient(90deg,${V.terracotta},${V.gold},${V.sage},transparent)`,borderRadius:2}} />
    </div>
  );
}

function StatCard({ l, v, c, i, top }) {
  return (
    <div className="vcard" style={{padding:18,textAlign:"center",[top?"borderTop":"borderLeft"]:`5px solid ${c}`,transition:"transform .2s"}}
      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
      <div style={{fontSize:24,marginBottom:4}}>{i}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:c,margin:"4px 0"}}>{v}</div>
      <div style={{fontSize:11,color:V.muted,letterSpacing:.3}}>{l}</div>
    </div>
  );
}

function SBadge(status) {
  const s = STATUS_STYLE[status]||{bg:"#eee",color:"#333",icon:"•"};
  return <span style={{background:s.bg,color:s.color,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:"nowrap",fontFamily:"'Cinzel',serif",letterSpacing:.3,display:"inline-flex",alignItems:"center",gap:4}}>{s.icon} {status}</span>;
}

function StatusBar({ status }) {
  const idx = STATUS_FLOW.indexOf(status);
  return (
    <div style={{marginTop:18}}>
      <div style={{display:"flex",alignItems:"center"}}>
        {STATUS_FLOW.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
            <div style={{width:30,height:30,borderRadius:3,background:i<=idx?V.terracotta:V.sand,display:"flex",alignItems:"center",justifyContent:"center",color:i<=idx?V.cream:V.muted,fontSize:12,fontFamily:"'Cinzel',serif",fontWeight:700,flexShrink:0,border:`2px solid ${i<=idx?V.clay:V.border}`,transition:"all .3s"}}>
              {i<=idx?"✓":i+1}
            </div>
            {i<STATUS_FLOW.length-1 && <div style={{flex:1,height:3,background:i<idx?V.terracotta:V.sand,transition:"background .3s"}} />}
          </div>
        ))}
      </div>
      <div style={{display:"flex"}}>
        {STATUS_FLOW.map(s=><span key={s} style={{flex:1,fontSize:10,color:V.muted,textAlign:"center",marginTop:6,fontStyle:"italic"}}>{s}</span>)}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return <span style={{marginLeft:8,fontSize:12,color:V.muted,background:V.sand,borderRadius:2,padding:"2px 8px",fontFamily:"'Lora',serif"}}>{children}</span>;
}

function Row({ children, gap=0, style }) {
  return <div style={{display:"flex",alignItems:"center",gap,...style}}>{children}</div>;
}

function Switch({ label, link, onClick, color }) {
  return <p style={{textAlign:"center",marginTop:16,fontSize:14,color:V.muted,fontStyle:"italic"}}>{label} <span onClick={onClick} style={{color,cursor:"pointer",fontWeight:700,fontStyle:"normal",fontFamily:"'Cinzel',serif",fontSize:13}}>{link}</span></p>;
}

function Demo({ lines }) {
  return (
    <div style={{marginTop:14,background:V.sand,borderRadius:3,padding:"10px 14px",border:`1px dashed ${V.terracotta}`}}>
      <p style={{margin:"0 0 5px",fontSize:10,color:V.clay,fontFamily:"'Cinzel',serif",letterSpacing:1.5}}>DEMO CREDENTIALS</p>
      {lines.map((l,i)=><p key={i} style={{margin:"3px 0",fontSize:12,color:V.earth,fontFamily:"monospace"}}>{l}</p>)}
    </div>
  );
}
