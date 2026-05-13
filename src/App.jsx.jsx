import { useState } from "react";

// ── Venda Colour Palette ──────────────────────────────────────
const V = {
  clay:      "#7A2E0E",
  terracotta:"#B84A22",
  ochre:     "#C97D0A",
  gold:      "#E09A18",
  sand:      "#EED49A",
  cream:     "#FAF0D7",
  bark:      "#2E1508",
  earth:     "#4A2010",
  sage:      "#3D6040",
  rust:      "#8B2A0C",
  muted:     "#8A6045",
  border:    "#D4A870",
  night:     "#180C04",
  pattern:   "#C97D0A",
};

// ── Global CSS ────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Lora', Georgia, serif; background: ${V.cream}; color: ${V.bark}; }

/* ── Venda geometric stripe — zigzag band used as borders ── */
.stripe {
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    ${V.terracotta}  0px,  ${V.terracotta} 14px,
    ${V.gold}       14px,  ${V.gold}       28px,
    ${V.clay}       28px,  ${V.clay}       42px,
    ${V.sage}       42px,  ${V.sage}       56px
  );
}
.stripe-sm {
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    ${V.terracotta}  0px,  ${V.terracotta}  8px,
    ${V.gold}        8px,  ${V.gold}       16px,
    ${V.clay}       16px,  ${V.clay}       24px,
    ${V.sage}       24px,  ${V.sage}       32px
  );
}
.stripe-thin {
  height: 3px;
  background: linear-gradient(90deg, ${V.terracotta}, ${V.gold}, ${V.clay}, ${V.sage}, ${V.terracotta});
}

/* ── Diamond tile background for navs ── */
.diamond-bg {
  background-color: ${V.bark};
  background-image:
    linear-gradient(45deg,  rgba(201,125,10,.13) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(184,74,34,.13)  25%, transparent 25%),
    linear-gradient(45deg,  transparent 75%, rgba(61,96,64,.11)  75%),
    linear-gradient(-45deg, transparent 75%, rgba(201,125,10,.09) 75%);
  background-size: 20px 20px;
}

/* ── Woven texture for table headers ── */
.weave-bg {
  background-color: ${V.earth};
  background-image:
    repeating-linear-gradient(0deg,   transparent, transparent 3px, rgba(224,154,24,.1) 3px, rgba(224,154,24,.1) 4px),
    repeating-linear-gradient(90deg,  transparent, transparent 3px, rgba(184,74,34,.1)  3px, rgba(184,74,34,.1)  4px);
}

/* ── Card with top stripe ── */
.vcard {
  background: #fffaf0;
  border: 1.5px solid ${V.border};
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}
.vcard::before {
  content: '';
  display: block;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    ${V.terracotta}  0, ${V.terracotta}  8px,
    ${V.gold}        8px, ${V.gold}       16px,
    ${V.clay}       16px, ${V.clay}       24px
  );
}

/* ── Triangle pattern overlay for hero ── */
.tri-bg {
  background-color: ${V.night};
  background-image:
    repeating-linear-gradient( 60deg, rgba(201,125,10,.06)  0, rgba(201,125,10,.06)  1px, transparent 1px, transparent 28px),
    repeating-linear-gradient(120deg, rgba(184,74,34,.06)   0, rgba(184,74,34,.06)   1px, transparent 1px, transparent 28px),
    repeating-linear-gradient(180deg, rgba(61,96,64,.04)    0, rgba(61,96,64,.04)    1px, transparent 1px, transparent 28px);
}

/* ── Product card tile ── */
.product-tile {
  background: #fffaf0;
  border: 1.5px solid ${V.border};
  border-radius: 3px;
  overflow: hidden;
  transition: transform .2s, box-shadow .2s;
}
.product-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(122,46,14,.2);
}

/* ── Product image area with crosshatch ── */
.product-img {
  background-color: #f5e9cc;
  background-image:
    repeating-linear-gradient( 45deg, rgba(201,125,10,.07) 0, rgba(201,125,10,.07) 1px, transparent 1px, transparent 10px),
    repeating-linear-gradient(-45deg, rgba(184,74,34,.07)  0, rgba(184,74,34,.07)  1px, transparent 1px, transparent 10px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px 0;
  font-size: 52px;
  position: relative;
}
.product-img::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 4px;
  background: repeating-linear-gradient(90deg, ${V.terracotta} 0, ${V.terracotta} 8px, ${V.gold} 8px, ${V.gold} 16px, ${V.clay} 16px, ${V.clay} 24px);
}

/* ── Buttons ── */
.vbtn {
  font-family: 'Cinzel', serif;
  font-weight: 600;
  letter-spacing: .6px;
  border-radius: 2px;
  cursor: pointer;
  transition: filter .15s, transform .1s;
  border: none;
  padding: 9px 20px;
  font-size: 13px;
}
.vbtn:hover  { filter: brightness(1.1); }
.vbtn:active { transform: scale(.97); }
.vbtn-outline {
  background: transparent !important;
  border: 2px solid currentColor !important;
}

/* ── Inputs ── */
.vinput {
  font-family: 'Lora', serif;
  font-size: 14px;
  padding: 10px 13px;
  border: 1.5px solid ${V.border};
  border-radius: 2px;
  background: ${V.cream};
  color: ${V.bark};
  display: block;
  transition: border-color .15s, box-shadow .15s;
}
.vinput:focus {
  outline: none;
  border-color: ${V.terracotta};
  box-shadow: 0 0 0 3px rgba(184,74,34,.18);
}

/* ── Divider ── */
.vdivider {
  height: 3px;
  border: none;
  background: repeating-linear-gradient(90deg,
    ${V.terracotta}  0, ${V.terracotta} 12px,
    ${V.gold}       12px, ${V.gold}      24px,
    ${V.clay}       24px, ${V.clay}      36px,
    ${V.sage}       36px, ${V.sage}      48px
  );
  margin: 20px 0;
}

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp .35s ease forwards; }

/* ── Table rows ── */
.trow:hover { background: rgba(201,125,10,.08) !important; }

/* ── Scrollbar ── */
::-webkit-scrollbar       { width: 7px; }
::-webkit-scrollbar-track { background: ${V.cream}; }
::-webkit-scrollbar-thumb { background: ${V.terracotta}; border-radius: 3px; }

/* ── Nav active tab underline ── */
.nav-tab-active { border-bottom: 3px solid ${V.gold}; }

/* ── Category pill ── */
.cat-pill {
  border-radius: 2px;
  padding: 5px 15px;
  cursor: pointer;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all .15s;
}
`;

// ── Seed data ─────────────────────────────────────────────────
const SEED_VENDORS = [
  { id:1, businessName:"Masindi Fresh Produce",  ownerName:"Masindi Netshituka",  email:"masindi@gmail.com",   phone:"0721234567", category:"Agriculture", description:"Fresh seasonal produce from the Limpopo fields.", status:"approved", joined:"2024-01-10", password:"vendor1" },
  { id:2, businessName:"Venda Crafts Hub",        ownerName:"Tshililo Mukwevho",   email:"tshililo@gmail.com",  phone:"0839876543", category:"Handcraft",   description:"Authentic hand-crafted Venda art and baskets.",  status:"approved", joined:"2024-03-15", password:"vendor2" },
  { id:3, businessName:"Thohoyandou Spices",      ownerName:"Ndi Ramavhoya",       email:"ndi@gmail.com",       phone:"0764567890", category:"Food",        description:"Traditional Venda spices and dried foods.",      status:"pending",  joined:"2025-03-28", password:"vendor3" },
];
const SEED_PRODUCTS = [
  { id:1, vendorId:1, name:"Mixed Vegetable Box",  price:85,  stock:40, category:"Agriculture", emoji:"🥦", description:"Fresh seasonal vegetables from Limpopo.",      approved:true  },
  { id:2, vendorId:1, name:"Morogo Bundle",          price:30,  stock:80, category:"Agriculture", emoji:"🌿", description:"Traditional wild spinach, hand-picked daily.", approved:true  },
  { id:3, vendorId:2, name:"Venda Wooden Mask",      price:320, stock:12, category:"Handcraft",   emoji:"🎭", description:"Hand-carved ceremonial mask by local artisan.", approved:true  },
  { id:4, vendorId:2, name:"Woven Basket (Large)",   price:150, stock:25, category:"Handcraft",   emoji:"🧺", description:"Traditional Venda weaving, natural grass.",    approved:true  },
  { id:5, vendorId:3, name:"Mutodi Spice Mix",        price:55,  stock:60, category:"Food",        emoji:"🌶️",description:"Authentic Venda spice blend for cooking.",    approved:false },
];
const SEED_ORDERS = [
  { id:"ORD-001", customerId:"cust-1", customerName:"Lufuno Tshivhase",  vendorId:1, productId:1, qty:2, total:170, status:"Delivered",   date:"2025-03-28", address:"14 Maphiri St, Thohoyandou", paymentRef:"PAY-7831" },
  { id:"ORD-002", customerId:"cust-2", customerName:"Rendani Mphephu",   vendorId:2, productId:3, qty:1, total:320, status:"In Transit",  date:"2025-04-01", address:"7 Ngovhela Rd, Sibasa",       paymentRef:"PAY-7832" },
  { id:"ORD-003", customerId:"cust-1", customerName:"Lufuno Tshivhase",  vendorId:1, productId:2, qty:3, total:90,  status:"Processing",  date:"2025-04-02", address:"14 Maphiri St, Thohoyandou", paymentRef:"PAY-7833" },
];
const SEED_CUSTOMERS = [
  { id:"cust-1", name:"Lufuno Tshivhase",  email:"lufuno@gmail.com",   phone:"0761112222", address:"14 Maphiri St, Thohoyandou", password:"cust1",  joined:"2024-06-01" },
  { id:"cust-2", name:"Rendani Mphephu",   email:"rendani@gmail.com",  phone:"0839998888", address:"7 Ngovhela Rd, Sibasa",       password:"cust2",  joined:"2024-08-15" },
];
const SEED_MESSAGES = [
  { id:1, from:"admin", to:"cust-1", subject:"Welcome to the Marketplace!", body:"Welcome! We are glad to have you as part of our community.", date:"2025-04-01", read:true },
];

const STATUS_FLOW  = ["Pending","Processing","In Transit","Delivered"];
const STATUS_STYLE = {
  "Pending":    { bg:"#FEF3C7", color:"#92400E", icon:"⏳" },
  "Processing": { bg:"#FDE8D8", color:"#7C2D12", icon:"⚙️" },
  "In Transit": { bg:"#D1FAE5", color:"#065F46", icon:"🚶" },
  "Delivered":  { bg:"#DCFCE7", color:"#14532D", icon:"✅" },
};

const fmt = n => `R ${Number(n).toLocaleString("en-ZA",{minimumFractionDigits:2})}`;

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

  const ctx = { vendors,setVendors,products,setProducts,orders,setOrders,customers,setCustomers,messages,setMessages,session,setSession };
  return (
    <>
      <style>{CSS}</style>
      {!session                    && <AuthGate    {...ctx} />}
      {session?.role==="customer"  && <CustomerApp {...ctx} />}
      {session?.role==="vendor"    && <VendorApp   {...ctx} />}
      {session?.role==="admin"     && <AdminApp    {...ctx} />}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// AUTH GATE
// ══════════════════════════════════════════════════════════════
function AuthGate({ vendors,setVendors,customers,setCustomers,setSession }) {
  const [mode,  setMode]  = useState("landing");
  const [form,  setForm]  = useState({});
  const [error, setError] = useState("");
  const f = (k,v) => setForm(p=>({...p,[k]:v}));
  const go = (m) => { setForm({}); setError(""); setMode(m); };

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
    if (!form.businessName||!form.ownerName||!form.email||!form.password||!form.phone||!form.category) return setError("Please fill in all fields.");
    if (vendors.find(v=>v.email===form.email)) return setError("This email is already registered.");
    setVendors(v=>[...v,{id:Date.now(),businessName:form.businessName,ownerName:form.ownerName,email:form.email,phone:form.phone,category:form.category,description:form.description||"",status:"pending",joined:new Date().toISOString().slice(0,10),password:form.password}]);
    setMode("reg-done");
  };
  const registerCustomer = () => {
    if (!form.name||!form.email||!form.password||!form.phone) return setError("Please fill in all fields.");
    if (customers.find(c=>c.email===form.email)) return setError("This email is already registered.");
    const nc={id:`cust-${Date.now()}`,name:form.name,email:form.email,phone:form.phone,address:form.address||"",password:form.password,joined:new Date().toISOString().slice(0,10)};
    setCustomers(c=>[...c,nc]);
    setSession({role:"customer",id:nc.id});
  };

  /* ── Landing ── */
  if (mode==="landing") return (
    <div className="tri-bg" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px",position:"relative",overflow:"hidden"}}>
      {/* Top decorative triangles */}
      <svg style={{position:"absolute",top:0,right:0,opacity:.07,width:260,height:260,pointerEvents:"none"}} viewBox="0 0 260 260">
        <polygon points="260,0 260,260 0,0"   fill={V.terracotta}/>
        <polygon points="260,0 260,180 80,0"  fill={V.gold}/>
        <polygon points="260,0 260,100 160,0" fill={V.ochre}/>
      </svg>
      <svg style={{position:"absolute",bottom:0,left:0,opacity:.07,width:220,height:220,pointerEvents:"none"}} viewBox="0 0 220 220">
        <polygon points="0,220 220,220 0,0"   fill={V.clay}/>
        <polygon points="0,220 140,220 0,80"  fill={V.sage}/>
        <polygon points="0,220  60,220 0,160" fill={V.terracotta}/>
      </svg>

      <div className="stripe" style={{position:"absolute",top:0,left:0,right:0}} />

      {/* Emblem */}
      <div className="fade-up" style={{textAlign:"center",marginBottom:36}}>
        <svg viewBox="0 0 100 100" width="88" height="88" style={{display:"block",margin:"0 auto 14px"}}>
          <polygon points="50,6 94,82 6,82"  fill="none" stroke={V.gold}        strokeWidth="3"/>
          <polygon points="50,20 82,76 18,76" fill="none" stroke={V.terracotta}  strokeWidth="2"/>
          <polygon points="50,36 68,70 32,70" fill={V.ochre} opacity=".25"/>
          <circle  cx="50" cy="56" r="11"    fill={V.gold} opacity=".9"/>
          <text x="50" y="61" textAnchor="middle" fontSize="11" fontFamily="Cinzel,serif" fontWeight="700" fill={V.bark}>TM</text>
        </svg>
        <h1 style={{fontFamily:"'Cinzel',serif",color:V.gold,fontSize:32,letterSpacing:4,marginBottom:4,textShadow:`0 2px 24px ${V.ochre}55`}}>THOHOYANDOU</h1>
        <h2 style={{fontFamily:"'Cinzel',serif",color:V.terracotta,fontSize:16,fontWeight:400,letterSpacing:6,marginBottom:14}}>MARKETPLACE</h2>
        <div style={{height:2,background:`linear-gradient(90deg,transparent,${V.gold},transparent)`,maxWidth:220,margin:"0 auto 14px"}} />
        <p style={{color:V.sand,opacity:.7,fontSize:14,fontStyle:"italic"}}>Connecting rural vendors & buyers across Limpopo</p>
      </div>

      <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:14,width:"100%",maxWidth:360}}>
        {[
          {icon:"🛍️",title:"Shop",           sub:"Browse & buy local products",    color:V.ochre,  m:"login-customer"},
          {icon:"🏺",title:"Vendor Portal",  sub:"Register or manage your shop",   color:V.sage,   m:"login-vendor"},
          {icon:"🦅",title:"Admin Portal",   sub:"Platform oversight & control",   color:V.clay,   m:"login-admin"},
        ].map(b=>(
          <button key={b.m} onClick={()=>go(b.m)} style={{background:"rgba(255,255,255,0.06)",border:`2px solid ${b.color}`,borderRadius:3,padding:"15px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:16,textAlign:"left",width:"100%",transition:"background .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=b.color}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
            <span style={{fontSize:26}}>{b.icon}</span>
            <div>
              <div style={{fontFamily:"'Cinzel',serif",color:V.cream,fontSize:15,letterSpacing:1}}>{b.title}</div>
              <div style={{color:V.muted,fontSize:13,marginTop:2,fontStyle:"italic"}}>{b.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="stripe" style={{position:"absolute",bottom:0,left:0,right:0}} />
      <p style={{color:V.sand,opacity:.25,marginTop:32,fontSize:11,fontFamily:"'Cinzel',serif",letterSpacing:2}}>GROUP 6 · SYSTEM ANALYSIS · 2025</p>
    </div>
  );

  if (mode==="reg-done") return (
    <AuthShell title="Registration Submitted" onBack={()=>go("login-vendor")}>
      <div style={{textAlign:"center",padding:"10px 0"}}>
        <div style={{fontSize:52,marginBottom:12}}>🎉</div>
        <h3 style={{fontFamily:"'Cinzel',serif",color:V.sage,marginBottom:10}}>Application Received!</h3>
        <p style={{color:V.muted,fontSize:14,lineHeight:1.7}}>Your business registration is <strong>pending admin approval</strong>. You will be able to log in once approved.</p>
        <Btn onClick={()=>go("login-vendor")} bg={V.ochre} style={{marginTop:18}}>Back to Vendor Login</Btn>
      </div>
    </AuthShell>
  );

  const role  = mode.split("-")[1];
  const label = {customer:"🛍️ Customer",vendor:"🏺 Vendor",admin:"🦅 Admin"}[role];

  return (
    <AuthShell title={`${label} — ${mode.startsWith("login")?"Login":"Register"}`} onBack={()=>go("landing")}>
      {error && <div style={{background:"#FEE2E2",border:`1px solid ${V.rust}`,color:V.rust,borderRadius:2,padding:"8px 12px",marginBottom:12,fontSize:13,fontStyle:"italic"}}>⚠️ {error}</div>}

      {mode==="login-customer" && <>
        <FI label="Email"    value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Password" value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={loginCustomer} bg={V.ochre} full>Login</Btn>
        <Switch label="No account?" link="Register here" onClick={()=>go("reg-customer")} color={V.ochre} />
        <Demo lines={["lufuno@gmail.com / cust1"]} />
      </>}

      {mode==="reg-customer" && <>
        <FI label="Full Name"     value={form.name||""}     onChange={v=>f("name",v)} />
        <FI label="Email"         value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Phone"         value={form.phone||""}    onChange={v=>f("phone",v)} />
        <FI label="Home Address"  value={form.address||""}  onChange={v=>f("address",v)} />
        <FI label="Password"      value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={registerCustomer} bg={V.ochre} full>Create Account</Btn>
        <Switch label="Already registered?" link="Login" onClick={()=>go("login-customer")} color={V.ochre} />
      </>}

      {mode==="login-vendor" && <>
        <FI label="Business Email" value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Password"       value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={loginVendor} bg={V.sage} full>Login</Btn>
        <Switch label="New business?" link="Register your shop" onClick={()=>go("reg-vendor")} color={V.sage} />
        <Demo lines={["masindi@gmail.com / vendor1"]} />
      </>}

      {mode==="reg-vendor" && <>
        <FI label="Business Name"        value={form.businessName||""} onChange={v=>f("businessName",v)} />
        <FI label="Owner Full Name"      value={form.ownerName||""}    onChange={v=>f("ownerName",v)} />
        <FI label="Business Email"       value={form.email||""}        onChange={v=>f("email",v)} />
        <FI label="Phone Number"         value={form.phone||""}        onChange={v=>f("phone",v)} />
        <FS label="Business Category"    value={form.category||"Agriculture"} onChange={v=>f("category",v)} opts={["Agriculture","Food","Handcraft","Electronics","Clothing","Other"]} />
        <FI label="Business Description" value={form.description||""} onChange={v=>f("description",v)} />
        <FI label="Password"             value={form.password||""}     onChange={v=>f("password",v)} type="password" />
        <Btn onClick={registerVendor} bg={V.sage} full>Submit for Approval</Btn>
        <Switch label="Already registered?" link="Login" onClick={()=>go("login-vendor")} color={V.sage} />
      </>}

      {mode==="login-admin" && <>
        <FI label="Admin Email"    value={form.email||""}    onChange={v=>f("email",v)} />
        <FI label="Admin Password" value={form.password||""} onChange={v=>f("password",v)} type="password" />
        <Btn onClick={loginAdmin} bg={V.clay} full>Access Portal</Btn>
        <Demo lines={["admin@thohoyandou.gov.za / admin2025"]} />
      </>}
    </AuthShell>
  );
}

// ══════════════════════════════════════════════════════════════
// CUSTOMER APP
// ══════════════════════════════════════════════════════════════
function CustomerApp({ products,orders,setOrders,customers,session,setSession,messages,setMessages,vendors }) {
  const [tab,     setTab]     = useState("shop");
  const [search,  setSearch]  = useState("");
  const [catF,    setCatF]    = useState("All");
  const [cart,    setCart]    = useState([]);
  const [step,    setStep]    = useState(0);
  const [trackId, setTrackId] = useState("");
  const [tracked, setTracked] = useState(null);
  const [compose, setCompose] = useState(false);
  const [mf,      setMf]      = useState({subject:"",body:""});

  const me       = customers.find(c=>c.id===session.id);
  const myOrders = orders.filter(o=>o.customerId===session.id);
  const myMsgs   = messages.filter(m=>m.to===session.id||m.from===session.id);
  const unread   = myMsgs.filter(m=>m.to===session.id&&!m.read).length;
  const live     = products.filter(p=>{ const v=vendors.find(v=>v.id===p.vendorId); return p.approved&&v?.status==="approved"; });
  const cats     = ["All",...new Set(live.map(p=>p.category))];
  const filtered = live.filter(p=>(catF==="All"||p.category===catF)&&p.name.toLowerCase().includes(search.toLowerCase()));
  const cartTotal= cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount= cart.reduce((s,i)=>s+i.qty,0);

  const addCart  = p=>setCart(c=>{ const ex=c.find(i=>i.id===p.id); return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]; });
  const rmCart   = id=>setCart(c=>c.filter(i=>i.id!==id));
  const placeOrd = ()=>{ cart.forEach(item=>setOrders(o=>[...o,{id:`ORD-${String(o.length+100).padStart(3,"0")}`,customerId:session.id,customerName:me.name,vendorId:item.vendorId,productId:item.id,qty:item.qty,total:item.price*item.qty,status:"Pending",date:new Date().toISOString().slice(0,10),address:me.address,paymentRef:`PAY-${Math.floor(8000+Math.random()*999)}`}])); setCart([]); setStep(3); };
  const sendMsg  = ()=>{ setMessages(m=>[...m,{id:Date.now(),from:session.id,to:"admin",subject:mf.subject,body:mf.body,date:new Date().toISOString().slice(0,10),read:false}]); setMf({subject:"",body:""}); setCompose(false); };
  const markRead = id=>setMessages(m=>m.map(x=>x.id===id?{...x,read:true}:x));

  return (
    <div style={{minHeight:"100vh",background:V.cream}}>
      <VNav
        title="🛒 Thohoyandou Marketplace"
        tabs={[["🏠","shop","Shop"],["🛒","cart",`Cart${cartCount>0?` (${cartCount})`:""}  `],["📦","orders","Orders"],["✉️","messages",`Messages${unread>0?` (${unread})`:""}  `]]}
        active={tab} onTab={setTab} onExit={()=>setSession(null)} accent={V.ochre}
      />
      <div style={{maxWidth:880,margin:"0 auto",padding:"26px 16px"}} className="fade-up">

        {/* SHOP */}
        {tab==="shop" && <>
          <SecHead icon="🏺" title="Products" sub="Fresh from local vendors" />
          <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
            <input className="vinput" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:180}} />
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
            {cats.map(c=>(
              <button key={c} className="cat-pill" onClick={()=>setCatF(c)}
                style={{background:catF===c?V.terracotta:"transparent",border:`2px solid ${V.terracotta}`,color:catF===c?V.cream:V.terracotta}}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:18}}>
            {filtered.map(p=>(
              <div key={p.id} className="product-tile">
                <div className="product-img">{p.emoji||"📦"}</div>
                <div style={{padding:"14px 16px 16px"}}>
                  <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14,fontWeight:600,marginBottom:6,lineHeight:1.3}}>{p.name}</h3>
                  <p style={{color:V.muted,fontSize:13,marginBottom:10,lineHeight:1.5}}>{p.description}</p>
                  <div style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,fontSize:17,marginBottom:12}}>{fmt(p.price)}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:p.stock>0?V.sage:V.rust}}>Stock: {p.stock}</span>
                    <button className="vbtn" onClick={()=>addCart(p)} disabled={p.stock===0} style={{background:V.terracotta,color:V.cream,fontSize:12,padding:"6px 13px"}}>+ Add</button>
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
            ? <VCard style={{textAlign:"center",padding:40}}><div style={{fontSize:52,marginBottom:12}}>🎉</div><h3 style={{fontFamily:"'Cinzel',serif",color:V.sage,marginBottom:8}}>Order Placed Successfully!</h3><p style={{color:V.muted,marginBottom:16}}>Track it under the Orders tab.</p><Btn onClick={()=>{setStep(0);setTab("orders");}} bg={V.ochre}>View My Orders</Btn></VCard>
            : step===2
            ? <VCard><h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:14}}>Payment</h3><div style={{background:"#F0FDF4",border:`2px dashed ${V.sage}`,borderRadius:2,padding:14,marginBottom:16,fontSize:14,color:V.sage}}>✅ Secure simulated payment gateway. Total: <strong>{fmt(cartTotal)}</strong></div><Row gap={8}><Btn onClick={placeOrd} bg={V.sage}>Confirm Order</Btn><Btn onClick={()=>setStep(1)} bg={V.muted} outline>← Back</Btn></Row></VCard>
            : step===1
            ? <VCard><h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:10}}>Delivery Address</h3><p style={{color:V.muted,marginBottom:16}}>Delivering to: <strong>{me.address||"No address saved"}</strong></p><Row gap={8}><Btn onClick={()=>setStep(2)} bg={V.ochre}>Proceed to Payment →</Btn><Btn onClick={()=>setStep(0)} bg={V.muted} outline>← Back</Btn></Row></VCard>
            : cart.length===0
            ? <VCard><p style={{color:V.muted,textAlign:"center",fontSize:15,fontStyle:"italic",padding:20}}>Your cart is empty. Start shopping!</p></VCard>
            : <>
                {cart.map(i=>(
                  <div key={i.id} className="vcard" style={{padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
                    <span style={{fontSize:30}}>{i.emoji}</span>
                    <div style={{flex:1}}><div style={{fontFamily:"'Cinzel',serif",fontWeight:600,color:V.bark,fontSize:14}}>{i.name}</div><div style={{color:V.ochre,fontSize:13,marginTop:3}}>{fmt(i.price)} × {i.qty} = {fmt(i.price*i.qty)}</div></div>
                    <button onClick={()=>rmCart(i.id)} style={{background:"none",border:`1px solid ${V.rust}`,color:V.rust,cursor:"pointer",borderRadius:2,padding:"3px 9px",fontSize:13}}>✕</button>
                  </div>
                ))}
                <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,color:V.bark,fontSize:20,margin:"16px 0"}}>{fmt(cartTotal)}</div>
                <Btn onClick={()=>setStep(1)} bg={V.terracotta}>Checkout →</Btn>
              </>
          }
        </>}

        {/* ORDERS */}
        {tab==="orders" && <>
          <SecHead icon="📦" title="My Orders" sub="Track and view your orders" />
          <div style={{display:"flex",gap:10,marginBottom:16}}>
            <input className="vinput" placeholder="Enter Order ID e.g. ORD-001" value={trackId} onChange={e=>setTrackId(e.target.value.toUpperCase())} style={{flex:1}} />
            <Btn onClick={()=>setTracked(orders.find(o=>o.id===trackId)||"none")} bg={V.terracotta}>Track</Btn>
          </div>
          {tracked==="none" && <p style={{color:V.rust,fontStyle:"italic",marginBottom:12}}>Order not found.</p>}
          {tracked&&tracked!=="none" && (
            <VCard style={{marginBottom:16,borderLeft:`5px solid ${V.ochre}`,padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark}}>{tracked.id}</strong>{SBadge(tracked.status)}</div>
              <p style={{fontSize:13,color:V.muted,margin:"3px 0"}}>📍 {tracked.address} · 🧾 {tracked.paymentRef} · 💰 {fmt(tracked.total)}</p>
              <StatusBar status={tracked.status} />
            </VCard>
          )}
          {myOrders.map(o=>(
            <div key={o.id} className="vcard" style={{padding:14,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{o.id}</strong>{SBadge(o.status)}</div>
              <p style={{margin:"5px 0 0",fontSize:13,color:V.muted}}>📍 {o.address} · 💰 {fmt(o.total)} · 📅 {o.date}</p>
            </div>
          ))}
        </>}

        {/* MESSAGES */}
        {tab==="messages" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <SecHead icon="✉️" title="Messages" sub="Your conversations with admin" />
            <Btn onClick={()=>setCompose(true)} bg={V.clay} style={{marginTop:2}}>+ Contact Admin</Btn>
          </div>
          {compose && (
            <VCard style={{marginBottom:16,padding:18}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:14}}>New Message to Admin</h3>
              <FI label="Subject" value={mf.subject} onChange={v=>setMf(x=>({...x,subject:v}))} />
              <label style={{fontSize:13,color:V.muted,fontStyle:"italic"}}>Message</label>
              <textarea value={mf.body} onChange={e=>setMf(x=>({...x,body:e.target.value}))} rows={4} className="vinput" style={{width:"100%",marginTop:4,resize:"vertical"}} />
              <Row gap={8} style={{marginTop:10}}><Btn onClick={sendMsg} bg={V.clay}>Send</Btn><Btn onClick={()=>setCompose(false)} bg={V.muted} outline>Cancel</Btn></Row>
            </VCard>
          )}
          {myMsgs.slice().reverse().map(m=>(
            <div key={m.id} onClick={()=>markRead(m.id)} className="vcard" style={{padding:14,marginBottom:10,cursor:"pointer",background:(!m.read&&m.to===session.id)?"#FEF9EE":"#fffaf0",borderLeft:`5px solid ${m.from==="admin"?V.clay:V.ochre}`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{!m.read&&m.to===session.id?"🔴 ":""}{m.subject}</strong><span style={{fontSize:11,color:V.muted}}>{m.date}</span></div>
              <p style={{margin:"5px 0 2px",fontSize:12,color:V.muted}}>{m.from==="admin"?"📨 From Admin":"📤 Sent to Admin"}</p>
              <p style={{margin:"4px 0 0",fontSize:13,color:V.bark}}>{m.body}</p>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// VENDOR APP
// ══════════════════════════════════════════════════════════════
function VendorApp({ vendors,products,setProducts,orders,setOrders,session,setSession }) {
  const [tab,   setTab]   = useState("overview");
  const [showF, setShowF] = useState(false);
  const [pf,    setPf]    = useState({name:"",price:"",stock:"",category:"Food",description:"",emoji:"📦"});
  const EMOJIS = ["📦","🥦","🌿","🎭","🧺","🌶️","🔦","🔋","👕","🍯","🐄","🌽","🥕","🧅","🍠","🫙"];

  const me      = vendors.find(v=>v.id===session.id);
  const myProds = products.filter(p=>p.vendorId===session.id);
  const myOrds  = orders.filter(o=>o.vendorId===session.id);
  const revenue = myOrds.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0);

  const addProd  = ()=>{ if(!pf.name||!pf.price||!pf.stock) return; setProducts(p=>[...p,{id:Date.now(),vendorId:session.id,name:pf.name,price:parseFloat(pf.price),stock:parseInt(pf.stock),category:pf.category,emoji:pf.emoji||"📦",description:pf.description,approved:false}]); setPf({name:"",price:"",stock:"",category:"Food",description:"",emoji:"📦"}); setShowF(false); };
  const delProd  = id=>setProducts(p=>p.filter(x=>x.id!==id));
  const advOrder = id=>setOrders(o=>o.map(x=>{ if(x.id!==id) return x; const i=STATUS_FLOW.indexOf(x.status); return i<STATUS_FLOW.length-1?{...x,status:STATUS_FLOW[i+1]}:x; }));

  return (
    <div style={{minHeight:"100vh",background:V.cream}}>
      <VNav title={`🏺 ${me?.businessName}`}
        tabs={[["📊","overview","Overview"],["📦","products","Products"],["📋","orders","Orders"]]}
        active={tab} onTab={setTab} onExit={()=>setSession(null)} accent={V.sage} />
      <div style={{maxWidth:840,margin:"0 auto",padding:"26px 16px"}} className="fade-up">

        {tab==="overview" && <>
          <SecHead icon="📊" title="Dashboard" sub="Your shop performance at a glance" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(158px,1fr))",gap:14,marginBottom:24}}>
            {[{l:"Revenue",v:fmt(revenue),c:V.ochre,i:"💰"},{l:"Products",v:myProds.length,c:V.sage,i:"🏺"},{l:"Orders",v:myOrds.length,c:V.clay,i:"📋"},{l:"Pending Approval",v:myProds.filter(p=>!p.approved).length,c:V.rust,i:"⏳"}]
              .map(s=><StatCard key={s.l} {...s} />)}
          </div>
          {myProds.filter(p=>!p.approved).length>0 && (
            <div style={{background:"#FEF3C7",border:`2px dashed ${V.ochre}`,borderRadius:2,padding:12,marginBottom:16,fontSize:13,color:"#92400E",fontStyle:"italic"}}>
              ⏳ {myProds.filter(p=>!p.approved).length} product(s) awaiting admin approval before going live.
            </div>
          )}
          <hr className="vdivider" />
          <h3 style={{fontFamily:"'Cinzel',serif",color:V.earth,marginBottom:12}}>Recent Orders</h3>
          {myOrds.slice(-4).reverse().map(o=>(
            <div key={o.id} className="vcard" style={{padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><strong style={{fontFamily:"'Cinzel',serif",fontSize:13,color:V.bark}}>{o.id}</strong><span style={{color:V.muted,fontSize:13,marginLeft:8}}>{o.customerName}</span></div>
              <Row gap={8}><span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700}}>{fmt(o.total)}</span>{SBadge(o.status)}</Row>
            </div>
          ))}
        </>}

        {tab==="products" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <SecHead icon="📦" title="My Products" sub="Manage your product listings" />
            <Btn onClick={()=>setShowF(true)} bg={V.terracotta}>+ Upload Product</Btn>
          </div>
          {showF && (
            <VCard style={{marginBottom:20,padding:20}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:14}}>Upload New Product</h3>
              <label style={{fontSize:13,color:V.muted,fontStyle:"italic",display:"block",marginBottom:8}}>Choose an icon</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
                {EMOJIS.map(e=><button key={e} onClick={()=>setPf(p=>({...p,emoji:e}))} style={{fontSize:22,background:pf.emoji===e?V.sand:"#f5e9cc",border:pf.emoji===e?`2px solid ${V.terracotta}`:"2px solid transparent",borderRadius:2,padding:"4px 8px",cursor:"pointer"}}>{e}</button>)}
              </div>
              <FI label="Product Name" value={pf.name} onChange={v=>setPf(p=>({...p,name:v}))} />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <FI label="Price (R)"    type="number" value={pf.price}  onChange={v=>setPf(p=>({...p,price:v}))} />
                <FI label="Stock Qty"   type="number" value={pf.stock}  onChange={v=>setPf(p=>({...p,stock:v}))} />
              </div>
              <FS label="Category" value={pf.category} onChange={v=>setPf(p=>({...p,category:v}))} opts={["Agriculture","Food","Handcraft","Electronics","Clothing","Other"]} />
              <FI label="Description" value={pf.description} onChange={v=>setPf(p=>({...p,description:v}))} />
              <Row gap={8} style={{marginTop:10}}>
                <Btn onClick={addProd} bg={V.sage}>Submit for Approval</Btn>
                <Btn onClick={()=>setShowF(false)} bg={V.muted} outline>Cancel</Btn>
              </Row>
              <p style={{fontSize:12,color:V.muted,marginTop:10,fontStyle:"italic"}}>Products require admin approval before appearing in the marketplace.</p>
            </VCard>
          )}
          {myProds.map(p=>(
            <div key={p.id} className="vcard" style={{padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontSize:30}}>{p.emoji}</span>
              <div style={{flex:1}}><div style={{fontFamily:"'Cinzel',serif",fontWeight:600,color:V.bark,fontSize:14}}>{p.name}</div><div style={{color:V.muted,fontSize:13,marginTop:2}}>{p.category} · Stock: {p.stock}</div></div>
              <span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,marginRight:10}}>{fmt(p.price)}</span>
              <span style={{fontSize:12,background:p.approved?"#D1FAE5":"#FEF3C7",color:p.approved?V.sage:"#92400E",borderRadius:2,padding:"3px 10px",fontWeight:700}}>{p.approved?"✅ Live":"⏳ Pending"}</span>
              <button onClick={()=>delProd(p.id)} style={{background:"none",border:`1px solid ${V.rust}`,color:V.rust,cursor:"pointer",borderRadius:2,padding:"3px 8px",marginLeft:6}}>🗑</button>
            </div>
          ))}
        </>}

        {tab==="orders" && <>
          <SecHead icon="📋" title="Orders" sub="Customer orders for your products" />
          {myOrds.map(o=>(
            <VCard key={o.id} style={{padding:16,marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark}}>{o.id}</strong>{SBadge(o.status)}</div>
              <p style={{margin:"3px 0",fontSize:13,color:V.muted}}>👤 {o.customerName} · 📍 {o.address}</p>
              <p style={{margin:"3px 0",fontSize:13,color:V.muted}}>🧾 {o.paymentRef} · 💰 {fmt(o.total)} · 📅 {o.date}</p>
              {o.status!=="Delivered" && <Btn onClick={()=>advOrder(o.id)} bg={V.sage} style={{marginTop:10,padding:"6px 14px",fontSize:13}}>Advance → {STATUS_FLOW[STATUS_FLOW.indexOf(o.status)+1]}</Btn>}
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
function AdminApp({ vendors,setVendors,products,setProducts,orders,setOrders,customers,messages,setMessages,session,setSession }) {
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

  const approveV  = id=>setVendors(v=>v.map(x=>x.id===id?{...x,status:"approved"}:x));
  const rejectV   = id=>setVendors(v=>v.map(x=>x.id===id?{...x,status:"rejected"}:x));
  const approveP  = id=>setProducts(p=>p.map(x=>x.id===id?{...x,approved:true}:x));
  const rejectP   = id=>setProducts(p=>p.filter(x=>x.id!==id));
  const delOrder  = id=>setOrders(o=>o.filter(x=>x.id!==id));
  const delAllDel = ()=>setOrders(o=>o.filter(x=>x.status!=="Delivered"));
  const markRead  = id=>setMessages(m=>m.map(x=>x.id===id?{...x,read:true}:x));
  const sendReply = ()=>{ setMessages(m=>[...m,{id:Date.now(),from:"admin",to:replyF.to,subject:replyF.subject,body:replyF.body,date:new Date().toISOString().slice(0,10),read:false}]); setReplyF({to:"",subject:"",body:""}); setComposeO(false); setSelMsg(null); };

  const navTabs=[
    ["📊","overview","Overview"],
    ["🏪","vendors", `Vendors${pendV.length>0?` (${pendV.length})`:""}  `],
    ["📦","products",`Products${pendP.length>0?` (${pendP.length})`:""}  `],
    ["📋","orders",  "Orders"],
    ["✉️","messages",`Messages${unread>0?` (${unread})`:""}  `],
    ["👥","customers","Customers"],
  ];

  return (
    <div style={{minHeight:"100vh",background:V.cream}}>
      <VNav title="🦅 Admin Portal" tabs={navTabs} active={tab} onTab={setTab} onExit={()=>setSession(null)} accent={V.clay} />
      <div style={{maxWidth:940,margin:"0 auto",padding:"26px 16px"}} className="fade-up">

        {/* OVERVIEW */}
        {tab==="overview" && <>
          <SecHead icon="📊" title="Platform Overview" sub="Marketplace-wide statistics" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:14,marginBottom:24}}>
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
          <VCard style={{padding:20}}>
            <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:16}}>Order Status Breakdown</h3>
            {STATUS_FLOW.map(s=>{ const cnt=orders.filter(o=>o.status===s).length; const pct=orders.length?Math.round(cnt/orders.length*100):0; return (
              <div key={s} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:14,color:V.earth}}>{STATUS_STYLE[s].icon} {s}</span><span style={{fontSize:13,color:V.muted}}>{cnt} orders ({pct}%)</span></div>
                <div style={{height:10,borderRadius:2,background:V.sand,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:2,background:`linear-gradient(90deg,${V.terracotta},${V.gold})`}} /></div>
              </div>
            );})}
          </VCard>
        </>}

        {/* VENDORS */}
        {tab==="vendors" && <>
          <SecHead icon="🏪" title="Vendor Management" sub="Approve registrations & manage vendors" />
          {pendV.length>0 && <>
            <h3 style={{fontFamily:"'Cinzel',serif",color:V.rust,marginBottom:12}}>⏳ Pending Approval ({pendV.length})</h3>
            {pendV.map(v=>(
              <VCard key={v.id} style={{padding:18,marginBottom:12,borderLeft:`5px solid ${V.gold}`}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                  <div>
                    <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:15}}>{v.businessName}</strong>
                    <Tag>{v.category}</Tag>
                    <p style={{margin:"6px 0 3px",fontSize:13,color:V.muted}}>👤 {v.ownerName} · 📧 {v.email} · 📞 {v.phone}</p>
                    <p style={{margin:"3px 0",fontSize:13,color:V.muted,fontStyle:"italic"}}>{v.description}</p>
                    <p style={{margin:"3px 0",fontSize:12,color:V.muted}}>Registered: {v.joined}</p>
                  </div>
                  <Row gap={8} style={{alignSelf:"flex-start"}}>
                    <Btn onClick={()=>approveV(v.id)} bg={V.sage}>✅ Approve</Btn>
                    <Btn onClick={()=>rejectV(v.id)}  bg={V.rust} outline>❌ Reject</Btn>
                  </Row>
                </div>
              </VCard>
            ))}
            <hr className="vdivider" />
          </>}
          <h3 style={{fontFamily:"'Cinzel',serif",color:V.earth,marginBottom:12}}>All Vendors</h3>
          {vendors.map(v=>{ const vOs=orders.filter(o=>o.vendorId===v.id); const vR=vOs.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0); const sc={approved:V.sage,pending:V.ochre,rejected:V.rust}[v.status]; return (
            <div key={v.id} className="vcard" style={{padding:18,marginBottom:12,borderLeft:`5px solid ${sc}`}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div>
                  <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:15}}>{v.businessName}</strong>
                  <span style={{marginLeft:8,fontSize:11,background:`${sc}22`,color:sc,borderRadius:2,padding:"2px 8px",fontWeight:700,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{v.status.toUpperCase()}</span>
                  <p style={{margin:"5px 0 3px",fontSize:13,color:V.muted}}>👤 {v.ownerName} · 📧 {v.email}</p>
                  <Row gap={16} style={{marginTop:10,flexWrap:"wrap"}}>
                    <span style={{fontSize:13,fontFamily:"'Cinzel',serif",color:V.ochre}}>{fmt(vR)}</span>
                    <span style={{fontSize:13,color:V.clay}}>{vOs.length} orders</span>
                    <span style={{fontSize:13,color:V.sage}}>{products.filter(p=>p.vendorId===v.id&&p.approved).length} products</span>
                  </Row>
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
            <h3 style={{fontFamily:"'Cinzel',serif",color:V.rust,marginBottom:12}}>⏳ Pending Approval ({pendP.length})</h3>
            {pendP.map(p=>{ const vnd=vendors.find(v=>v.id===p.vendorId); return (
              <VCard key={p.id} style={{padding:18,marginBottom:12,borderLeft:`5px solid ${V.gold}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                  <Row gap={14}>
                    <span style={{fontSize:34}}>{p.emoji}</span>
                    <div>
                      <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14}}>{p.name}</strong>
                      <p style={{margin:"3px 0",fontSize:13,color:V.muted}}>{p.category} · {fmt(p.price)} · Stock: {p.stock}</p>
                      <p style={{margin:"3px 0",fontSize:12,color:V.muted}}>Vendor: <em>{vnd?.businessName}</em></p>
                      <p style={{margin:"3px 0",fontSize:12,color:V.muted,fontStyle:"italic"}}>{p.description}</p>
                    </div>
                  </Row>
                  <Row gap={8}>
                    <Btn onClick={()=>approveP(p.id)} bg={V.sage}>✅ Approve</Btn>
                    <Btn onClick={()=>rejectP(p.id)}  bg={V.rust} outline>❌ Reject</Btn>
                  </Row>
                </div>
              </VCard>
            );})}
            <hr className="vdivider" />
          </>}
          <h3 style={{fontFamily:"'Cinzel',serif",color:V.earth,marginBottom:12}}>Live Products</h3>
          {products.filter(p=>p.approved).map(p=>{ const vnd=vendors.find(v=>v.id===p.vendorId); return (
            <div key={p.id} className="vcard" style={{padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontSize:28}}>{p.emoji}</span>
              <div style={{flex:1}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:14}}>{p.name}</strong><div style={{fontSize:13,color:V.muted,marginTop:2}}>{vnd?.businessName} · {p.category} · Stock: {p.stock}</div></div>
              <span style={{fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700}}>{fmt(p.price)}</span>
              <button onClick={()=>rejectP(p.id)} style={{background:"none",border:`1px solid ${V.rust}`,color:V.rust,cursor:"pointer",borderRadius:2,padding:"3px 8px",marginLeft:8}}>🗑</button>
            </div>
          );})}
        </>}

        {/* ORDERS */}
        {tab==="orders" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
            <SecHead icon="📋" title="All Orders" sub="Full order management & cleanup" />
            {delOrds.length>0 && <Btn onClick={delAllDel} bg={V.rust}>🗑 Clear All Delivered ({delOrds.length})</Btn>}
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",borderRadius:2,overflow:"hidden",boxShadow:"0 2px 14px rgba(122,46,14,.14)"}}>
              <thead>
                <tr className="weave-bg">
                  {["Order","Customer","Vendor","Total","Date","Status","Action"].map(h=>(
                    <th key={h} style={{padding:"12px 14px",textAlign:"left",color:V.gold,fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:1.2,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o,i)=>{ const vnd=vendors.find(v=>v.id===o.vendorId); return (
                  <tr key={o.id} className="trow" style={{background:i%2===0?"#fffaf0":V.cream,borderBottom:`1px solid ${V.border}`}}>
                    <td style={{padding:"10px 14px",fontFamily:"'Cinzel',serif",color:V.bark,fontSize:12,fontWeight:700}}>{o.id}</td>
                    <td style={{padding:"10px 14px",color:V.muted,fontSize:13}}>{o.customerName}</td>
                    <td style={{padding:"10px 14px",color:V.muted,fontSize:13}}>{vnd?.businessName}</td>
                    <td style={{padding:"10px 14px",fontFamily:"'Cinzel',serif",color:V.ochre,fontWeight:700,fontSize:13}}>{fmt(o.total)}</td>
                    <td style={{padding:"10px 14px",color:V.muted,fontSize:13}}>{o.date}</td>
                    <td style={{padding:"10px 14px"}}>{SBadge(o.status)}</td>
                    <td style={{padding:"10px 14px"}}>
                      {o.status==="Delivered"
                        ? <button onClick={()=>delOrder(o.id)} style={{background:"none",border:`1.5px solid ${V.rust}`,color:V.rust,borderRadius:2,padding:"4px 10px",cursor:"pointer",fontSize:12,fontFamily:"'Cinzel',serif"}}>🗑 Remove</button>
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
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
            <SecHead icon="✉️" title="Customer Messages" sub="Read and respond to customer enquiries" />
            <Btn onClick={()=>{setComposeO(true);setSelMsg(null);}} bg={V.clay}>+ Compose</Btn>
          </div>
          {composeO && (
            <VCard style={{padding:18,marginBottom:16}}>
              <h3 style={{fontFamily:"'Cinzel',serif",color:V.bark,marginBottom:14}}>Send Message to Customer</h3>
              <FS label="Send To" value={replyF.to} onChange={v=>setReplyF(f=>({...f,to:v}))} opts={customers.map(c=>c.id)} labels={customers.map(c=>`${c.name} (${c.email})`)} />
              <FI label="Subject" value={replyF.subject} onChange={v=>setReplyF(f=>({...f,subject:v}))} />
              <label style={{fontSize:13,color:V.muted,fontStyle:"italic"}}>Message</label>
              <textarea value={replyF.body} onChange={e=>setReplyF(f=>({...f,body:e.target.value}))} rows={4} className="vinput" style={{width:"100%",marginTop:4,resize:"vertical"}} />
              <Row gap={8} style={{marginTop:10}}><Btn onClick={sendReply} bg={V.clay}>Send Message</Btn><Btn onClick={()=>setComposeO(false)} bg={V.muted} outline>Cancel</Btn></Row>
            </VCard>
          )}
          {selMsg && (
            <VCard style={{padding:18,marginBottom:16,borderLeft:`5px solid ${V.clay}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <strong style={{fontFamily:"'Cinzel',serif",color:V.bark}}>{selMsg.subject}</strong>
                <button onClick={()=>setSelMsg(null)} style={{background:"none",border:"none",cursor:"pointer",color:V.muted,fontSize:18}}>✕</button>
              </div>
              <p style={{fontSize:13,color:V.muted,marginBottom:10}}>From: {customers.find(c=>c.id===selMsg.from)?.name||selMsg.from} · {selMsg.date}</p>
              <p style={{fontSize:14,color:V.bark,lineHeight:1.7,marginBottom:14}}>{selMsg.body}</p>
              <Btn onClick={()=>{setReplyF({to:selMsg.from,subject:`Re: ${selMsg.subject}`,body:""});setComposeO(true);setSelMsg(null);}} bg={V.clay}>Reply</Btn>
            </VCard>
          )}
          {inboxMs.length===0
            ? <VCard style={{padding:20}}><p style={{color:V.muted,textAlign:"center",fontStyle:"italic"}}>No messages yet.</p></VCard>
            : inboxMs.slice().reverse().map(m=>(
              <div key={m.id} onClick={()=>{markRead(m.id);setSelMsg(m);}} className="vcard" style={{padding:14,marginBottom:10,cursor:"pointer",background:m.read?"#fffaf0":"#FEF9EE",borderLeft:`5px solid ${m.read?V.border:V.gold}`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:13}}>{!m.read?"🔴 ":""}{m.subject}</strong><span style={{fontSize:11,color:V.muted}}>{m.date}</span></div>
                <p style={{margin:"5px 0 3px",fontSize:13,color:V.muted}}>From: {customers.find(c=>c.id===m.from)?.name||"Unknown"}</p>
                <p style={{margin:"4px 0 0",fontSize:13,color:V.bark}}>{m.body.slice(0,100)}{m.body.length>100?"…":""}</p>
              </div>
            ))}
        </>}

        {/* CUSTOMERS */}
        {tab==="customers" && <>
          <SecHead icon="👥" title="Registered Customers" sub="View customer activity and send messages" />
          {customers.map(c=>{ const cOs=orders.filter(o=>o.customerId===c.id); const cSp=cOs.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0); return (
            <div key={c.id} className="vcard" style={{padding:18,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div>
                  <strong style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:15}}>👤 {c.name}</strong>
                  <p style={{margin:"5px 0 3px",fontSize:13,color:V.muted}}>📧 {c.email} · 📞 {c.phone}</p>
                  <p style={{margin:"3px 0",fontSize:13,color:V.muted}}>📍 {c.address}</p>
                  <Row gap={16} style={{marginTop:10,flexWrap:"wrap"}}>
                    <span style={{fontSize:13,fontFamily:"'Cinzel',serif",color:V.ochre}}>{fmt(cSp)} spent</span>
                    <span style={{fontSize:13,color:V.clay}}>{cOs.length} orders</span>
                    <span style={{fontSize:12,color:V.muted,fontStyle:"italic"}}>Joined {c.joined}</span>
                  </Row>
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

function VNav({ title, tabs, active, onTab, onExit, accent }) {
  return (
    <nav className="diamond-bg" style={{position:"sticky",top:0,zIndex:100}}>
      <div className="stripe-sm" />
      <div style={{maxWidth:940,margin:"0 auto",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
        <span style={{fontFamily:"'Cinzel',serif",color:V.gold,fontSize:15,letterSpacing:1.5}}>{title}</span>
        <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
          {tabs.map(([icon,t,label])=>(
            <button key={t} onClick={()=>onTab(t)} style={{background:active===t?accent:"transparent",border:"none",color:active===t?V.cream:V.sand,borderRadius:2,padding:"8px 12px",cursor:"pointer",fontFamily:active===t?"'Cinzel',serif":"'Lora',serif",fontSize:13,fontWeight:active===t?700:400,letterSpacing:active===t?.5:0,transition:"all .15s",borderBottom:active===t?`3px solid ${V.gold}`:"3px solid transparent"}}>
              {icon} {label}
            </button>
          ))}
          <button onClick={onExit} style={{background:"transparent",border:`1.5px solid ${V.muted}`,color:V.muted,borderRadius:2,padding:"6px 12px",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:1.5,marginLeft:4}}>EXIT</button>
        </div>
      </div>
      <div className="stripe-sm" />
    </nav>
  );
}

function AuthShell({ title, onBack, children }) {
  return (
    <div className="tri-bg" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="vcard fade-up" style={{width:"100%",maxWidth:430,padding:28}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:V.muted,cursor:"pointer",fontSize:13,marginBottom:12,padding:0,fontStyle:"italic",fontFamily:"'Lora',serif"}}>← Back</button>
        {title && <h2 style={{fontFamily:"'Cinzel',serif",color:V.earth,margin:"0 0 20px",fontSize:17,letterSpacing:1}}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

function VCard({ children, style }) {
  return <div className="vcard" style={{padding:0,...style}}>{children}</div>;
}

function Btn({ children, onClick, bg, outline, full, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button className="vbtn" onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: outline ? (hov ? bg+"22" : "transparent") : hov ? bg+"e0" : bg,
        border: `2px solid ${bg}`,
        color: outline ? bg : V.cream,
        width: full ? "100%" : undefined,
        ...style
      }}>
      {children}
    </button>
  );
}

function FI({ label, value, onChange, type="text" }) {
  return (
    <div style={{marginBottom:10}}>
      {label && <label style={{display:"block",fontSize:13,color:V.muted,marginBottom:4,fontStyle:"italic"}}>{label}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} className="vinput" style={{width:"100%"}} />
    </div>
  );
}

function FS({ label, value, onChange, opts, labels }) {
  return (
    <div style={{marginBottom:10}}>
      {label && <label style={{display:"block",fontSize:13,color:V.muted,marginBottom:4,fontStyle:"italic"}}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} className="vinput" style={{width:"100%"}}>
        {opts.map((o,i)=><option key={o} value={o}>{labels?.[i]||o}</option>)}
      </select>
    </div>
  );
}

function SecHead({ icon, title, sub }) {
  return (
    <div style={{marginBottom:22}}>
      <h2 style={{fontFamily:"'Cinzel',serif",color:V.bark,fontSize:22,margin:"0 0 4px",letterSpacing:1}}>{icon} {title}</h2>
      <p style={{color:V.muted,fontSize:14,margin:"0 0 10px",fontStyle:"italic"}}>{sub}</p>
      <div style={{height:3,background:`linear-gradient(90deg,${V.terracotta},${V.gold},${V.sage},transparent)`,borderRadius:2}} />
    </div>
  );
}

function StatCard({ l, v, c, i, top }) {
  return (
    <div className="vcard" style={{padding:16,textAlign:"center",[top?"borderTop":"borderLeft"]:`5px solid ${c}`}}>
      <div style={{fontSize:22}}>{i}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:700,color:c,margin:"6px 0 4px"}}>{v}</div>
      <div style={{fontSize:11,color:V.muted,letterSpacing:.3}}>{l}</div>
    </div>
  );
}

function SBadge(status) {
  const s = STATUS_STYLE[status]||{bg:"#eee",color:"#333",icon:"•"};
  return <span style={{background:s.bg,color:s.color,padding:"3px 10px",borderRadius:2,fontSize:12,fontWeight:700,whiteSpace:"nowrap",fontFamily:"'Cinzel',serif",letterSpacing:.3}}>{s.icon} {status}</span>;
}

function StatusBar({ status }) {
  const idx = STATUS_FLOW.indexOf(status);
  return (
    <div style={{marginTop:16}}>
      <div style={{display:"flex",alignItems:"center"}}>
        {STATUS_FLOW.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
            <div style={{width:28,height:28,borderRadius:2,background:i<=idx?V.terracotta:V.sand,display:"flex",alignItems:"center",justifyContent:"center",color:i<=idx?V.cream:V.muted,fontSize:11,fontFamily:"'Cinzel',serif",fontWeight:700,flexShrink:0,border:`2px solid ${i<=idx?V.clay:V.border}`}}>
              {i<=idx?"✓":i+1}
            </div>
            {i<STATUS_FLOW.length-1 && <div style={{flex:1,height:3,background:i<idx?V.terracotta:V.sand}} />}
          </div>
        ))}
      </div>
      <div style={{display:"flex"}}>
        {STATUS_FLOW.map(s=><span key={s} style={{flex:1,fontSize:10,color:V.muted,textAlign:"center",marginTop:5,fontStyle:"italic"}}>{s}</span>)}
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
  return <p style={{textAlign:"center",marginTop:14,fontSize:14,color:V.muted,fontStyle:"italic"}}>{label} <span onClick={onClick} style={{color,cursor:"pointer",fontWeight:700,fontStyle:"normal",fontFamily:"'Cinzel',serif",fontSize:13}}>{link}</span></p>;
}

function Demo({ lines }) {
  return (
    <div style={{marginTop:12,background:V.sand,borderRadius:2,padding:"10px 12px",border:`1px dashed ${V.terracotta}`}}>
      <p style={{margin:"0 0 4px",fontSize:10,color:V.clay,fontFamily:"'Cinzel',serif",letterSpacing:1.5}}>DEMO CREDENTIALS</p>
      {lines.map((l,i)=><p key={i} style={{margin:"2px 0",fontSize:12,color:V.earth,fontFamily:"monospace"}}>{l}</p>)}
    </div>
  );
}
