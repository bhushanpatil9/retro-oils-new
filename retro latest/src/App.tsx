import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import BrandLogo from "./components/BrandLogo";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Droplet,
  ExternalLink,
  Factory,
  FileCheck2,
  FileText,
  HardHat,
  Leaf,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Recycle,
  Route,
  Scale,
  Search,
  ShieldCheck,
  Truck,
  UsersRound,
  Wrench,
  X,
} from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Quotation Sent" | "Pickup Scheduled" | "Completed" | "Follow-up" | "Closed";
type Lead = {
  id: string;
  date: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  businessType: string;
  quantity: string;
  leadType: string;
  status: LeadStatus;
  notes: string;
  payload: Record<string, string>;
};

type CompanyInfo = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  gstin: string;
  gstinStatus: string;
  authorizationStatus: string;
  authorizationVerified: boolean;
  registrationNumber: string;
  authorizationNumber: string;
  issueDate: string;
  validityDate: string;
  issuingAuthority: string;
  documentLink: string;
  serviceAreas: string;
  businessHours: string;
  linkedin: string;
  instagram: string;
  facebook: string;
};

type FAQ = { question: string; answer: string };
type Article = { title: string; category: string; excerpt: string; body: string };
type DialogKind = "pickup" | "buyer";

const DEFAULT_COMPANY: CompanyInfo = {
  phone: "+91-9313993438",
  whatsapp: "+91-9313993438",
  email: "info.retrooils@gmail.com",
  address: "Tara Chand Ni Chali, Mahavir Nagar, Gopal Nagar, Amraiwadi, Ahmedabad, Gujarat, India - 380026",
  gstin: "IN PROCESS",
  gstinStatus: "IN PROCESS",
  authorizationStatus: "IN PROCESS",
  authorizationVerified: false,
  registrationNumber: "",
  authorizationNumber: "",
  issueDate: "",
  validityDate: "",
  issuingAuthority: "",
  documentLink: "",
  serviceAreas: "Amraiwadi\nVatva\nNaroda\nOdhav\nChangodar\nSanand\nGIDC industrial areas\nNearby industrial clusters",
  businessHours: "Mon - Sat · 9:00 AM - 7:00 PM",
  linkedin: "",
  instagram: "",
  facebook: "",
};

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "What is Category 5.1 used oil?",
    answer:
      "Category 5.1 refers to used oil under the applicable hazardous-waste framework. Its collection, movement and recovery must be managed in line with the rules, guidance and directions currently applicable to each party.",
  },
  {
    question: "Do you collect used oil from garages?",
    answer:
      "Yes, subject to collection feasibility, applicable requirements and the nature and quantity of the material. Share your location and estimated quantity so the team can review the route.",
  },
  {
    question: "Do you collect from factories?",
    answer:
      "Industrial generators can submit a pickup enquiry. Collection arrangements depend on the material, quantity, site conditions, documentation and applicable requirements.",
  },
  {
    question: "What information is needed before pickup?",
    answer:
      "We typically ask for the company name, location, estimated quantity, container details and other information needed to assess a suitable collection and movement arrangement.",
  },
  {
    question: "Do you provide containers?",
    answer:
      "Where applicable, container placement may be offered to regular collection partners, subject to operational and regulatory requirements.",
  },
  {
    question: "How is quantity measured?",
    answer:
      "Quantity can be verified through suitable weighing or measurement arrangements agreed for the collection. The method and record are confirmed for each arrangement.",
  },
  {
    question: "Do you provide documentation?",
    answer:
      "Applicable collection, movement, quantity and waste documentation can be maintained according to the responsibilities of the respective parties and current requirements.",
  },
  {
    question: "Do you store used oil?",
    answer:
      "Collection and transportation are distinct from storage operations. The CA-1 model is intended for collection and transportation without a separate storage facility; storage arrangements such as CA-2 are subject to separate applicable requirements. Confirm the exact operating model and approvals before any movement.",
  },
  {
    question: "Can you directly sell used oil to a recycler?",
    answer:
      "Material is handed over to the appropriate authorized downstream entity according to the applicable regulatory framework and business arrangement. retro oils is a collection and supply partner, not an authorized recycler unless a separate status is officially established.",
  },
  {
    question: "Do you provide rates?",
    answer:
      "Collection and supply pricing depends on quantity, material condition, location, transportation requirements, market conditions and downstream buyer terms. Contact us for a current quotation; no permanent rate is published here.",
  },
  {
    question: "Do you provide pickup from small generators?",
    answer:
      "Yes, subject to route, quantity, material condition, collection arrangement and applicable requirements.",
  },
];

const DEFAULT_ARTICLES: Article[] = [
  {
    title: "What Is Category 5.1 Used Oil?",
    category: "Category 5.1",
    excerpt: "A practical introduction to used oil classification and the framework that shapes responsible handling.",
    body:
      "Used oil is generated during servicing, maintenance and industrial operations. Category 5.1 is addressed under India's hazardous-waste framework, alongside the used-oil EPR provisions. Generators and other entities should confirm their own responsibilities, registration requirements and records against the rules and current directions that apply to them.",
  },
  {
    title: "Used Oil Collection: What Every Garage Should Know",
    category: "Collection",
    excerpt: "Simple steps for keeping used oil contained, identifying collection needs and preparing for a pickup.",
    body:
      "Keep used oil in suitable, closed and clearly identified containers. Avoid mixing it with other wastes or allowing it to reach drains or soil. Before collection, note your location, an approximate quantity, container type and how often oil is generated. A collection arrangement should also agree the measurement method and records required for the parties involved.",
  },
  {
    title: "CA-1 vs CA-2: What Is the Difference?",
    category: "Environmental Compliance",
    excerpt: "An overview of collection and transport versus storage, and why the operating model matters.",
    body:
      "CA-1 is the collection-agent category associated with collection and transportation without a separate storage facility, subject to current CPCB guidance and the directions of the concerned SPCB or PCC. CA-2 relates to a different operating model involving storage and its applicable conditions. This summary is not legal advice: confirm current definitions, validations and responsibilities before operations.",
  },
  {
    title: "Why Proper Used Oil Documentation Matters",
    category: "Documentation",
    excerpt: "Traceable records help participants understand quantity, movement and downstream handover.",
    body:
      "Clear source, quantity, movement and receiver information helps the parties involved maintain a reliable chain of custody. Which forms and records apply depends on the entity category, authorization status, transport arrangement and current regulatory directions. Maintain the documents relevant to your role and seek specialist advice where necessary.",
  },
  {
    title: "Used Oil Collection for Industrial Units",
    category: "Industrial Waste Management",
    excerpt: "Plan recurring collections around site procedures, volumes and operational requirements.",
    body:
      "Industrial collection programs begin with a site and material review. Generators can prepare information on expected quantities, container locations, access requirements, operating hours and internal EHS procedures. A recurring schedule can then be discussed, subject to route feasibility and the applicable compliance requirements.",
  },
  {
    title: "How Used Oil Moves from Generator to Recycler",
    category: "Recycling",
    excerpt: "Follow the movement from source and safe collection to appropriate downstream recovery.",
    body:
      "A responsible chain begins at the generator, continues through suitable collection and compliant transport, and ends with a handover to an appropriate authorized downstream facility. Records and responsibilities should be clear at each stage. The downstream entity and recovery pathway depend on applicable approvals, material characteristics and commercial arrangements.",
  },
  {
    title: "Form 8, Form 9 and Form 10 Explained",
    category: "Documentation",
    excerpt: "A general guide to familiar documentation references, with an important applicability reminder.",
    body:
      "Form 8 is commonly associated with container labelling, Form 9 with transport emergency information and Form 10 with manifest or movement documentation under the relevant framework. Applicability and current formats can change and depend on the parties, movement and rules in force. Always confirm current requirements with the competent authority or a qualified adviser.",
  },
];

const NAV_LINKS = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Generators", "generators"],
  ["Buyers", "buyers"],
  ["Compliance", "compliance"],
  ["Process", "process"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

const WHY_ITEMS = [
  { number: "01", title: "DOCUMENTED MOVEMENT", text: "Proper records and applicable waste-management documentation for traceability.", Icon: FileCheck2 },
  { number: "02", title: "TRANSPARENT WEIGHMENT", text: "Clear quantity measurement and transparent transaction records.", Icon: Scale },
  { number: "03", title: "SAFE COLLECTION", text: "Appropriate containers, safe loading procedures and spill-control arrangements.", Icon: ShieldCheck },
  { number: "04", title: "RELIABLE COLLECTION NETWORK", text: "Scheduled programs for workshops, garages, service stations and industrial generators.", Icon: Route },
  { number: "05", title: "RESPONSIBLE DOWNSTREAM CHANNELS", text: "Material is routed toward suitable authorized recovery channels, as applicable.", Icon: Recycle },
  { number: "06", title: "PROFESSIONAL COMMUNICATION", text: "Clear collection schedules, documentation and payment or settlement communication.", Icon: MessageCircle },
];

const SERVICE_ITEMS = [
  {
    number: "01",
    title: "Used oil collection",
    intro: "Organized pickup programs for used oil generated during routine maintenance and operations.",
    Icon: Droplet,
    list: ["Automobile workshops", "Garages & service stations", "Factories & industrial units", "Fleet operators", "Commercial establishments"],
    features: ["Scheduled pickup", "Drum / container collection", "Quantity verification", "Collection records", "Safe handling procedures", "Organized transfer"],
  },
  {
    number: "02",
    title: "Used oil aggregation",
    intro: "Collection from multiple generators can be coordinated and consolidated for onward transfer to an appropriate downstream facility.",
    Icon: UsersRound,
    list: ["Multiple generators", "Route-based collection", "Consolidated movement", "Downstream coordination"],
    features: [],
  },
  {
    number: "03",
    title: "Industrial collection",
    intro: "Recurring programs shaped around operating schedules, site access and generator requirements.",
    Icon: Factory,
    list: ["Manufacturing plants", "Machine shops", "Engineering units", "Automotive industries", "Equipment maintenance facilities"],
    features: ["Recurring collection programs", "Site and quantity review", "Route planning", "Coordinated movement"],
  },
  {
    number: "04",
    title: "Documentation support",
    intro: "Support to organize applicable records across collection, transport and downstream transfer.",
    Icon: FileText,
    list: ["Applicable waste documentation", "Container labelling", "Transport documentation", "Manifest-related records", "Quantity, generator and receiver information", "Transaction records"],
    features: [],
  },
  {
    number: "05",
    title: "Buyer supply",
    intro: "Structured supply coordination for eligible downstream facilities, subject to current applicable requirements.",
    Icon: Truck,
    list: ["Authorized recyclers", "Re-refiners", "Co-processors", "Eligible recovery facilities"],
    features: ["Aggregated material", "Source / quantity records", "Supply scheduling", "Delivery coordination", "Chain-of-custody documentation"],
  },
];

const GENERATOR_TYPES = [
  { title: "GARAGES", text: "Engine oil, transmission oil and maintenance-generated used oil.", Icon: Wrench },
  { title: "AUTOMOBILE WORKSHOPS", text: "Collection planning for regular service operations.", Icon: Building2 },
  { title: "SERVICE STATIONS", text: "Organized used-oil collection programs.", Icon: Navigation },
  { title: "FACTORIES", text: "Industrial used-oil collection aligned to site operations.", Icon: Factory },
  { title: "ENGINEERING UNITS", text: "Machine and maintenance oil collection.", Icon: HardHat },
  { title: "FLEET OPERATORS", text: "Used oil generated during vehicle maintenance.", Icon: Truck },
];

const PROCESS_STEPS = [
  ["01", "SOURCE", "Identify the generator and collection requirement."],
  ["02", "COLLECT", "Collect with suitable equipment and containers."],
  ["03", "VERIFY", "Check quantity and collection information."],
  ["04", "DOCUMENT", "Maintain applicable movement and transaction records."],
  ["05", "TRANSPORT", "Move material using appropriate compliant arrangements."],
  ["06", "TRANSFER", "Handover to the appropriate authorized downstream facility."],
  ["07", "RECOVERY", "Material moves toward permitted recycling or recovery pathways."],
] as const;

const INDUSTRIES = [
  { label: "Automotive workshops", Icon: Wrench },
  { label: "Garages", Icon: Building2 },
  { label: "Service centres", Icon: UsersRound },
  { label: "Transport & fleet operators", Icon: Truck },
  { label: "Engineering industries", Icon: HardHat },
  { label: "Manufacturing units", Icon: Factory },
  { label: "Machine shops", Icon: SettingsIcon },
  { label: "Industrial maintenance", Icon: FileCheck2 },
  { label: "Factories", Icon: Factory },
  { label: "Commercial vehicle operators", Icon: Truck },
];

const COMPLIANCE_DOCS = [
  { title: "FORM 8", text: "Container labelling", Icon: FileText },
  { title: "FORM 9", text: "Transport emergency information / TREM-related documentation", Icon: ShieldCheck },
  { title: "FORM 10", text: "Manifest / movement documentation", Icon: Route },
  { title: "WEIGHMENT RECORDS", text: "Quantity verification", Icon: Scale },
  { title: "COLLECTION RECORDS", text: "Source and quantity tracking", Icon: FileCheck2 },
  { title: "RECEIVER RECORDS", text: "Downstream transfer information", Icon: Recycle },
];

function SettingsIcon(props: React.ComponentProps<typeof Factory>) {
  return <Factory {...props} />;
}

const GOVERNMENT_LINKS = [
  { label: "CPCB", href: "https://cpcb.nic.in/" },
  { label: "GPCB", href: "https://gpcb.gujarat.gov.in/webcontroller/page/head-office" },
  { label: "Used Oil EPR Portal", href: "https://eprusedoil.cpcb.gov.in/" },
  { label: "MoEFCC", href: "https://moef.gov.in/" },
];

const LEAD_TAB_TYPES: Record<string, string> = {
  "Pickup Requests": "Pickup Request",
  "Buyer Enquiries": "Buyer Enquiry",
  "Contact Enquiries": "Contact Enquiry",
};

const STORAGE_KEYS = {
  company: "retro-oils-company-v1",
  leads: "retro-oils-leads-v1",
  faqs: "retro-oils-faqs-v1",
  articles: "retro-oils-articles-v1",
};

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand-lockup${inverse ? " brand-lockup-inverse" : ""}`} href="#home" aria-label="RETRO OIL home">
      <BrandLogo inverse={inverse} />
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro reveal${light ? " section-intro-light" : ""}`}>
      <div className="eyebrow"><span />{eyebrow}</div>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return <li className="check-item"><span><Check size={13} strokeWidth={3} /></span>{children}</li>;
}

function Field({ label, required = false, className = "", children }: { label: string; required?: boolean; className?: string; children: ReactNode }) {
  return (
    <label className={`field${className ? ` ${className}` : ""}`}>
      <span className="field-label">{label}{required && <b aria-hidden="true"> *</b>}</span>
      {children}
    </label>
  );
}

function ModalShell({ title, onClose, children, size = "normal" }: { title: string; onClose: () => void; children: ReactNode; size?: "normal" | "wide" }) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className={`modal-panel${size === "wide" ? " modal-panel-wide" : ""}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div><div className="eyebrow"><span />RETRO OILS</div><h2>{title}</h2></div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        </div>
        {children}
      </section>
    </div>
  );
}

function whatsappLink(company: CompanyInfo, message: string) {
  const digits = company.whatsapp.replace(/\D/g, "");
  const base = digits.length >= 10 ? `https://wa.me/${digits}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

function phoneLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? `tel:+${digits}` : "#contact";
}

function formPayload(form: HTMLFormElement) {
  return Object.fromEntries(
    Array.from(new FormData(form).entries()).map(([key, value]) => [key, value instanceof File ? value.name : value]),
  ) as Record<string, string>;
}

function LeadModal({
  kind,
  onClose,
  onSubmit,
}: {
  kind: DialogKind;
  onClose: () => void;
  onSubmit: (kind: DialogKind, payload: Record<string, string>) => void;
}) {
  const [sent, setSent] = useState(false);
  const pickup = kind === "pickup";
  const title = pickup ? "Request a used oil pickup" : "Buyer supply enquiry";
  const heading = pickup ? "Tell us about your collection requirement." : "Let’s discuss a responsible supply partnership.";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (honeypot?.value) return;
    onSubmit(kind, formPayload(form));
    setSent(true);
  };

  return (
    <ModalShell title={title} onClose={onClose} size="wide">
      {sent ? (
        <div className="form-success">
          <span className="success-icon"><CheckCircle2 size={27} /></span>
          <h3>{pickup ? "Thank you. Your collection enquiry has been received." : "Thank you. Your buyer enquiry has been received."}</h3>
          <p>{pickup ? "Our team will contact you regarding quantity, location, route feasibility, documentation and pickup arrangements." : "Our team will review your facility, material and supply requirements before getting in touch."}</p>
          <p className="preview-note">Preview mode: this enquiry is saved in this browser only. Connect a secure server endpoint and email service before accepting live customer data.</p>
          <button className="button button-primary" type="button" onClick={onClose}>Close <ArrowRight size={16} /></button>
        </div>
      ) : (
        <>
          <p className="modal-intro">{heading}</p>
          <form className="business-form" onSubmit={submit}>
            <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {pickup ? (
              <>
                <div className="form-group-title">Personal / business details</div>
                <div className="form-grid">
                  <Field label="Contact person" required><input name="contactPerson" autoComplete="name" required placeholder="Your name" /></Field>
                  <Field label="Company / garage name" required><input name="companyName" autoComplete="organization" required placeholder="Business name" /></Field>
                  <Field label="Mobile number" required><input name="mobile" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{8,18}" required placeholder="+91" /></Field>
                  <Field label="WhatsApp number"><input name="whatsapp" type="tel" inputMode="tel" pattern="[0-9+() -]{8,18}" placeholder="If different from mobile" /></Field>
                  <Field label="Email"><input name="email" type="email" autoComplete="email" placeholder="name@company.com" /></Field>
                  <Field label="GSTIN (optional)"><input name="gstin" placeholder="GSTIN, if available" /></Field>
                  <Field label="Address" className="field-span"><input name="address" autoComplete="street-address" required placeholder="Collection address" /></Field>
                  <Field label="Area" required><input name="area" required placeholder="Area / industrial estate" /></Field>
                  <Field label="City" required><input name="city" required defaultValue="Ahmedabad" /></Field>
                  <Field label="Pincode"><input name="pincode" inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit pincode" /></Field>
                </div>
                <div className="form-group-title">Used oil details</div>
                <div className="form-grid">
                  <Field label="Type of business" required>
                    <select name="businessType" required defaultValue=""><option value="" disabled>Select business type</option><option>Garage</option><option>Automobile workshop</option><option>Service station</option><option>Factory / industrial unit</option><option>Engineering unit</option><option>Fleet operator</option><option>Other</option></select>
                  </Field>
                  <Field label="Approximate used oil quantity" required><input name="quantity" required placeholder="Estimated quantity" /></Field>
                  <Field label="Unit"><select name="unit" defaultValue="Litres"><option>Litres</option><option>Drums</option><option>Kg</option></select></Field>
                  <Field label="Collection frequency"><select name="frequency" defaultValue="One Time"><option>One Time</option><option>Weekly</option><option>Fortnightly</option><option>Monthly</option><option>Other</option></select></Field>
                  <Field label="Existing storage container"><select name="storageContainer" defaultValue=""><option value="" disabled>Select an option</option><option>Yes</option><option>No</option></select></Field>
                  <Field label="Preferred pickup date"><input name="preferredDate" type="date" /></Field>
                  <Field label="Preferred pickup time"><input name="preferredTime" type="time" /></Field>
                  <Field label="Upload photo of used oil container"><input name="containerPhoto" type="file" accept="image/*" /></Field>
                  <Field label="Upload supporting document"><input name="supportingDocument" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" /></Field>
                  <Field label="Additional message" className="field-span"><textarea name="message" rows={3} placeholder="Share any collection, site access or handling details." /></Field>
                </div>
                <label className="consent"><input name="accurateInformation" type="checkbox" value="confirmed" required /><span>I confirm that the information provided is accurate.</span></label>
              </>
            ) : (
              <>
                <div className="form-group-title">Buyer / facility details</div>
                <div className="form-grid">
                  <Field label="Company name" required><input name="companyName" autoComplete="organization" required placeholder="Registered business name" /></Field>
                  <Field label="Contact person" required><input name="contactPerson" autoComplete="name" required placeholder="Your name" /></Field>
                  <Field label="Mobile number" required><input name="mobile" type="tel" inputMode="tel" pattern="[0-9+() -]{8,18}" autoComplete="tel" required placeholder="+91" /></Field>
                  <Field label="Email" required><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></Field>
                  <Field label="GSTIN"><input name="gstin" placeholder="If available" /></Field>
                  <Field label="State" required><input name="state" required defaultValue="Gujarat" /></Field>
                  <Field label="Facility address" className="field-span"><input name="facilityAddress" placeholder="Facility address" /></Field>
                  <Field label="Buyer type" required><select name="buyerType" required defaultValue=""><option value="" disabled>Select buyer type</option><option>Recycler</option><option>Re-refiner</option><option>Co-processor</option><option>Other eligible downstream facility</option></select></Field>
                  <Field label="Required quantity"><input name="requiredQuantity" placeholder="Quantity / batch" /></Field>
                  <Field label="Frequency"><select name="frequency" defaultValue=""><option value="">Select frequency</option><option>One Time</option><option>Weekly</option><option>Fortnightly</option><option>Monthly</option><option>As required</option></select></Field>
                  <Field label="Preferred pickup / delivery area"><input name="preferredArea" placeholder="Area, city or industrial zone" /></Field>
                  <Field label="Material requirement / specification" className="field-span"><textarea name="materialSpecification" rows={3} placeholder="Share your material and quality requirements." /></Field>
                  <Field label="Registration / authorization details" className="field-span"><textarea name="authorizationDetails" rows={3} placeholder="Relevant registration details and issuing authority, where applicable." /></Field>
                  <Field label="Upload document"><input name="authorizationDocument" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" /></Field>
                  <Field label="Additional information"><textarea name="additionalInformation" rows={3} placeholder="Anything else we should know?" /></Field>
                </div>
              </>
            )}
            <p className="form-privacy"><ShieldCheck size={16} /> Your information is used only to respond to your business enquiry. In this preview, it stays in this browser and is not transmitted.</p>
            <button className="button button-primary form-submit" type="submit">{pickup ? "Request pickup" : "Submit buyer enquiry"}<ArrowRight size={17} /></button>
          </form>
        </>
      )}
    </ModalShell>
  );
}

function LegalModal({ page, onClose }: { page: "privacy" | "terms" | "disclaimer"; onClose: () => void }) {
  const content = {
    privacy: {
      title: "Privacy policy",
      paragraphs: [
        "RETRO OILS uses enquiry information to understand a business requirement and respond to the person who submitted it. Do not upload sensitive personal information or documents unless the business has confirmed a secure submission channel.",
        "This website preview stores form entries in local browser storage on the device used to submit them. It does not transmit entries to RETRO OILS, send email notifications or provide secure server-side storage. Before launch, connect an HTTPS-protected backend, define retention and access controls, publish a complete privacy notice and implement suitable spam protection.",
        "Contact details shown on this website are the business's verified primary contact channel. To request access or deletion in a production deployment, use the verified contact channel published by RETRO OILS.",
      ],
    },
    terms: {
      title: "Terms & conditions",
      paragraphs: [
        "Website content is provided for general business information. An enquiry does not confirm collection availability, a quotation, a pickup schedule, a supply commitment or acceptance of material.",
        "Collection, transport, documentation, transfer and any commercial settlement are subject to a separately confirmed arrangement, site and route feasibility, material condition, applicable law and the responsibilities of each party.",
        "The website owner should replace all placeholders, verify operational details and publish reviewed business terms before accepting live transactions or enquiries.",
      ],
    },
    disclaimer: {
      title: "Compliance disclaimer",
      paragraphs: [
        "The information presented on this website is for general business and informational purposes and should not be treated as legal advice. Used oil management is subject to applicable environmental, hazardous-waste, transportation and other laws, rules, guidelines and directions in force from time to time.",
        "Specific responsibilities and documentation may differ based on the generator, transporter, collection-agent category, recycler, co-processor and applicable authorization or registration. RETRO OILS will represent its authorization, registration and certification status accurately and only after the relevant approvals are obtained.",
        "Forms and regulatory requirements shown on this website are provided for general information. Actual requirements depend on the applicable rules, entity category, authorization status, transport arrangement and current directions of the competent authorities.",
      ],
    },
  }[page];
  return (
    <ModalShell title={content.title} onClose={onClose}>
      <div className="legal-copy">{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <button className="button button-secondary" type="button" onClick={onClose}>Close</button>
    </ModalShell>
  );
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <ModalShell title={article.title} onClose={onClose}>
      <span className="article-category">{article.category}</span>
      <p className="article-modal-lede">{article.excerpt}</p>
      <div className="legal-copy"><p>{article.body}</p></div>
      <p className="preview-note">For general information only. Confirm current requirements with the competent authority or a qualified adviser.</p>
      <button className="button button-secondary" type="button" onClick={onClose}>Back to knowledge centre</button>
    </ModalShell>
  );
}

function AdminPanel({
  onClose,
  company,
  onSaveCompany,
  leads,
  onUpdateLead,
  faqs,
  onSaveFaqs,
  articles,
  onSaveArticles,
}: {
  onClose: () => void;
  company: CompanyInfo;
  onSaveCompany: (value: CompanyInfo) => void;
  leads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  faqs: FAQ[];
  onSaveFaqs: (value: FAQ[]) => void;
  articles: Article[];
  onSaveArticles: (value: Article[]) => void;
}) {
  const [tab, setTab] = useState("Leads");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [companyDraft, setCompanyDraft] = useState(company);
  const [faqDraft, setFaqDraft] = useState(faqs);
  const [articleDraft, setArticleDraft] = useState(articles);
  const [savedMessage, setSavedMessage] = useState("");
  const statuses: LeadStatus[] = ["New", "Contacted", "Quotation Sent", "Pickup Scheduled", "Completed", "Follow-up", "Closed"];

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const matchesStatus = filter === "All statuses" || lead.status === filter;
    const matchesType = !LEAD_TAB_TYPES[tab] || lead.leadType === LEAD_TAB_TYPES[tab];
    const query = search.trim().toLowerCase();
    const matchesQuery = !query || [lead.name, lead.company, lead.phone, lead.email, lead.location, lead.leadType].join(" ").toLowerCase().includes(query);
    return matchesStatus && matchesType && matchesQuery;
  }), [filter, leads, search, tab]);

  const exportLeads = () => {
    const headings = ["Date", "Name", "Company", "Phone", "Email", "Location", "Business Type", "Estimated Quantity", "Lead Type", "Status", "Notes"];
    const lines = [headings, ...filteredLeads.map((lead) => [lead.date, lead.name, lead.company, lead.phone, lead.email, lead.location, lead.businessType, lead.quantity, lead.leadType, lead.status, lead.notes])];
    const csv = lines.map((line) => line.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "retro-oils-leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const save = (message: string) => {
    setSavedMessage(message);
    window.setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <ModalShell title="Local admin workspace" onClose={onClose} size="wide">
      <div className="admin-warning"><ShieldCheck size={18} /><span>This browser-only workspace is for preview and content editing. It has no login, server, shared database or secure lead storage. Do not use it for live customer data.</span></div>
      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Admin sections">
          {["Leads", "Pickup Requests", "Buyer Enquiries", "Contact Enquiries", "Company information", "FAQs", "Blog posts"].map((item) => <button type="button" className={tab === item ? "admin-tab active" : "admin-tab"} key={item} onClick={() => setTab(item)}>{item}</button>)}
          <div className="admin-side-note">Local preview<br /><strong>{leads.length}</strong> enquiry records</div>
        </aside>
        <div className="admin-content">
          {(tab === "Leads" || Boolean(LEAD_TAB_TYPES[tab])) && (
            <>
              <div className="admin-title-row"><div><h3>{tab === "Leads" ? "Enquiry records" : tab}</h3><p>Pickup, buyer and contact enquiries stored in this browser.</p></div><button type="button" className="button button-outline-small" onClick={exportLeads}><Download size={15} />Export CSV</button></div>
              <div className="admin-filters"><label className="admin-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, company, phone..." /></label><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter leads by status"><option>All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
              {filteredLeads.length ? (
                <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Received</th><th>Lead</th><th>Location / qty.</th><th>Type</th><th>Status</th></tr></thead><tbody>{filteredLeads.map((lead) => <tr key={lead.id}><td>{new Date(lead.date).toLocaleDateString("en-IN")}</td><td><strong>{lead.name || "—"}</strong><span>{lead.company || lead.phone || lead.email || "—"}</span></td><td>{lead.location || "—"}<span>{lead.quantity || ""}</span></td><td>{lead.leadType}</td><td><select value={lead.status} onChange={(event) => onUpdateLead({ ...lead, status: event.target.value as LeadStatus })} aria-label={`Update status for ${lead.name || "lead"}`}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><textarea aria-label={`Notes for ${lead.name || "lead"}`} value={lead.notes} onChange={(event) => onUpdateLead({ ...lead, notes: event.target.value })} placeholder="Add a note" rows={1} /></td></tr>)}</tbody></table></div>
              ) : <div className="empty-state"><FileText size={25} /><p>No enquiries match this view yet.</p></div>}
            </>
          )}
          {tab === "Company information" && (
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); onSaveCompany(companyDraft); save("Company information saved in this browser."); }}>
              <div className="admin-title-row"><div><h3>Company information</h3><p>Replace placeholders only with verified business details.</p></div></div>
              <div className="form-grid">
                <Field label="Phone"><input value={companyDraft.phone} onChange={(event) => setCompanyDraft({ ...companyDraft, phone: event.target.value })} /></Field>
                <Field label="WhatsApp"><input value={companyDraft.whatsapp} onChange={(event) => setCompanyDraft({ ...companyDraft, whatsapp: event.target.value })} /></Field>
                <Field label="Business email"><input type="email" value={companyDraft.email} onChange={(event) => setCompanyDraft({ ...companyDraft, email: event.target.value })} /></Field>
                <Field label="Business location"><input value={companyDraft.address} onChange={(event) => setCompanyDraft({ ...companyDraft, address: event.target.value })} /></Field>
                <Field label="GSTIN status / number"><input value={companyDraft.gstin} onChange={(event) => setCompanyDraft({ ...companyDraft, gstin: event.target.value })} /></Field>
                <Field label="GSTIN status"><input value={companyDraft.gstinStatus} onChange={(event) => setCompanyDraft({ ...companyDraft, gstinStatus: event.target.value })} /></Field>
                <Field label="Authorization status"><select value={companyDraft.authorizationStatus} onChange={(event) => setCompanyDraft({ ...companyDraft, authorizationStatus: event.target.value })}><option>IN PROCESS</option><option>REGISTERED / AUTHORIZED</option><option>NOT APPLICABLE</option></select></Field>
                <Field label="Registration number"><input value={companyDraft.registrationNumber} onChange={(event) => setCompanyDraft({ ...companyDraft, registrationNumber: event.target.value })} /></Field>
                <Field label="Authorization number"><input value={companyDraft.authorizationNumber} onChange={(event) => setCompanyDraft({ ...companyDraft, authorizationNumber: event.target.value })} /></Field>
                <Field label="Issue date"><input type="date" value={companyDraft.issueDate} onChange={(event) => setCompanyDraft({ ...companyDraft, issueDate: event.target.value })} /></Field>
                <Field label="Validity date"><input type="date" value={companyDraft.validityDate} onChange={(event) => setCompanyDraft({ ...companyDraft, validityDate: event.target.value })} /></Field>
                <Field label="Issuing authority"><input value={companyDraft.issuingAuthority} onChange={(event) => setCompanyDraft({ ...companyDraft, issuingAuthority: event.target.value })} /></Field>
                <Field label="Document link" className="field-span"><input type="url" value={companyDraft.documentLink} onChange={(event) => setCompanyDraft({ ...companyDraft, documentLink: event.target.value })} placeholder="HTTPS document link" /></Field>
                <Field label="Service areas (one per line)" className="field-span"><textarea rows={4} value={companyDraft.serviceAreas} onChange={(event) => setCompanyDraft({ ...companyDraft, serviceAreas: event.target.value })} /></Field>
                <Field label="Business hours" className="field-span"><input value={companyDraft.businessHours} onChange={(event) => setCompanyDraft({ ...companyDraft, businessHours: event.target.value })} /></Field>
              </div>
              <label className="consent verification-consent"><input type="checkbox" checked={companyDraft.authorizationVerified} onChange={(event) => setCompanyDraft({ ...companyDraft, authorizationVerified: event.target.checked })} /><span>I confirm relevant approval has officially been obtained and the details above are accurate. Only enable this after verifying the original document.</span></label>
              <div className="admin-title-row admin-subheading"><div><h4>Social media (leave blank until verified)</h4></div></div>
              <div className="form-grid">
                <Field label="LinkedIn URL"><input type="url" value={companyDraft.linkedin} onChange={(event) => setCompanyDraft({ ...companyDraft, linkedin: event.target.value })} /></Field>
                <Field label="Instagram URL"><input type="url" value={companyDraft.instagram} onChange={(event) => setCompanyDraft({ ...companyDraft, instagram: event.target.value })} /></Field>
                <Field label="Facebook URL"><input type="url" value={companyDraft.facebook} onChange={(event) => setCompanyDraft({ ...companyDraft, facebook: event.target.value })} /></Field>
              </div>
              <div className="admin-save-row"><button className="button button-primary" type="submit">Save company information <Check size={16} /></button>{savedMessage && <span role="status">{savedMessage}</span>}</div>
            </form>
          )}
          {tab === "FAQs" && (
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); onSaveFaqs(faqDraft); save("FAQs saved in this browser."); }}>
              <div className="admin-title-row"><div><h3>Frequently asked questions</h3><p>Edit the website answers. Keep compliance wording reviewed and current.</p></div></div>
              {faqDraft.map((faq, index) => <div className="editable-item" key={`${index}-${faq.question}`}><Field label={`Question ${index + 1}`}><input value={faq.question} onChange={(event) => setFaqDraft(faqDraft.map((item, itemIndex) => itemIndex === index ? { ...item, question: event.target.value } : item))} /></Field><Field label="Answer"><textarea rows={3} value={faq.answer} onChange={(event) => setFaqDraft(faqDraft.map((item, itemIndex) => itemIndex === index ? { ...item, answer: event.target.value } : item))} /></Field></div>)}
              <div className="admin-save-row"><button className="button button-primary" type="submit">Save FAQ content <Check size={16} /></button>{savedMessage && <span role="status">{savedMessage}</span>}</div>
            </form>
          )}
          {tab === "Blog posts" && (
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); onSaveArticles(articleDraft); save("Blog content saved in this browser."); }}>
              <div className="admin-title-row"><div><h3>Knowledge centre</h3><p>Edit article titles, categories, summaries and article bodies in this browser preview.</p></div></div>
              {articleDraft.map((article, index) => <div className="editable-item" key={`${index}-${article.title}`}><Field label={`Article ${index + 1} title`}><input value={article.title} onChange={(event) => setArticleDraft(articleDraft.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></Field><div className="form-grid"><Field label="Category"><input value={article.category} onChange={(event) => setArticleDraft(articleDraft.map((item, itemIndex) => itemIndex === index ? { ...item, category: event.target.value } : item))} /></Field><Field label="Summary"><textarea rows={2} value={article.excerpt} onChange={(event) => setArticleDraft(articleDraft.map((item, itemIndex) => itemIndex === index ? { ...item, excerpt: event.target.value } : item))} /></Field><Field label="Article body" className="field-span"><textarea rows={4} value={article.body} onChange={(event) => setArticleDraft(articleDraft.map((item, itemIndex) => itemIndex === index ? { ...item, body: event.target.value } : item))} /></Field></div></div>)}
              <div className="admin-save-row"><button className="button button-primary" type="submit">Save blog content <Check size={16} /></button>{savedMessage && <span role="status">{savedMessage}</span>}</div>
            </form>
          )}
        </div>
      </div>
    </ModalShell>
  );
}

function App() {
  const [company, setCompany] = useState<CompanyInfo>(() => readStored(STORAGE_KEYS.company, DEFAULT_COMPANY));
  const [leads, setLeads] = useState<Lead[]>(() => readStored(STORAGE_KEYS.leads, []));
  const [faqs, setFaqs] = useState<FAQ[]>(() => readStored(STORAGE_KEYS.faqs, DEFAULT_FAQS));
  const [articles, setArticles] = useState<Article[]>(() => readStored(STORAGE_KEYS.articles, DEFAULT_ARTICLES));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formKind, setFormKind] = useState<DialogKind | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [legalPage, setLegalPage] = useState<"privacy" | "terms" | "disclaimer" | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(company)); }, [company]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads)); }, [leads]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.articles, JSON.stringify(articles)); }, [articles]);

  const addLead = (kind: string, payload: Record<string, string>) => {
    const get = (...keys: string[]) => keys.map((key) => payload[key]).find((value) => value?.trim()) || "";
    const lead: Lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      name: get("contactPerson", "name"),
      company: get("companyName", "company"),
      phone: get("mobile", "phone"),
      email: get("email"),
      location: get("area", "city", "preferredArea", "facilityAddress", "address"),
      businessType: get("businessType", "buyerType"),
      quantity: get("quantity", "requiredQuantity"),
      leadType: kind,
      status: "New",
      notes: get("message", "additionalInformation", "materialSpecification"),
      payload,
    };
    setLeads((current) => [lead, ...current]);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (honeypot?.value) return;
    addLead("Contact Enquiry", formPayload(form));
    setContactSent(true);
    form.reset();
  };

  const hasVerifiedAuthorizationRecord = Boolean((company.authorizationNumber || company.registrationNumber) && company.issuingAuthority);
  const authorized = company.authorizationStatus === "REGISTERED / AUTHORIZED" && company.authorizationVerified && hasVerifiedAuthorizationRecord;
  const areas = company.serviceAreas.split("\n").map((area) => area.trim()).filter(Boolean);
  const pickupMessage = "Hello RETRO OILS, I want to enquire about Category 5.1 used oil collection. My location is ______ and approximate quantity is ______. Please contact me.";
  const buyerMessage = "Hello RETRO OILS, I am interested in a Category 5.1 used oil supply partnership. Please contact me regarding quantity, location and supply requirements.";

  return (
    <>
      <div className="announcement-bar">
        <div className="site-width announcement-inner">
          <p><span className="announcement-dot" />Category 5.1 Used Oil Collection <i /> Safe Handling <i /> Traceable Documentation</p>
          <div className="announcement-contact"><a href={phoneLink(company.phone)} aria-label="Call RETRO OILS"><Phone size={13} />Call</a><a href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer" aria-label="Message RETRO OILS on WhatsApp"><MessageCircle size={14} />WhatsApp</a></div>
        </div>
      </div>

      <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
        <div className="site-width header-inner">
          <Logo />
          <nav className={`desktop-nav${menuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
            {NAV_LINKS.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <button className="mobile-menu-cta" type="button" onClick={() => { setFormKind("pickup"); setMenuOpen(false); }}>Request pickup <ArrowRight size={15} /></button>
            <button className="mobile-menu-buyer" type="button" onClick={() => { setFormKind("buyer"); setMenuOpen(false); }}>Buyer enquiry <ArrowUpRight size={15} /></button>
          </nav>
          <div className="header-actions">
            <button className="buyer-header-link" type="button" onClick={() => setFormKind("buyer")}>Buyer enquiry</button>
            <button className="button button-primary header-cta" type="button" onClick={() => setFormKind("pickup")}>Request pickup <ArrowRight size={15} /></button>
          </div>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={24} />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-image" role="img" aria-label="A worker carefully transferring used oil into a secure industrial container" />
          <div className="hero-overlay" />
          <div className="site-width hero-content">
            <div className="hero-copy">
              <div className="hero-category"><span className="hero-category-line" />Category 5.1 Used Oil Collection & Supply Partner</div>
              <h1><span className="hero-wordmark">RETRO OILS</span><span className="hero-headline">Safe, legal & eco-friendly<br />waste oil management<br className="hero-desktop-break" /> solutions</span></h1>
              <p className="hero-subline">Responsible collection. Traceable movement. Resource recovery.</p>
              <p className="hero-description">We connect waste generators with organized collection, safe handling, documented movement and appropriate authorized downstream recycling, re-refining and recovery channels.</p>
              <div className="hero-actions">
                <button className="button button-lime" type="button" onClick={() => setFormKind("pickup")}>Request a pickup <ArrowRight size={17} /></button>
                <button className="button button-ghost" type="button" onClick={() => setFormKind("buyer")}>Buyer enquiry <ArrowUpRight size={16} /></button>
              </div>
              <ul className="hero-promises" aria-label="Service commitments">
                {["Safe collection", "Transparent weighment", "Traceable documentation", "Responsible recovery"].map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}
              </ul>
            </div>
            <a className="hero-scroll" href="#highlights"><span>Scroll to explore</span><ArrowDown size={16} /></a>
          </div>
        </section>

        <section id="highlights" className="trust-strip" aria-label="Service highlights">
          <div className="site-width trust-grid">
            {[
              ["01", "Category 5.1", "Used oil focus"],
              ["02", "Safe handling", "Collection & transportation"],
              ["03", "Documentation", "Traceable waste movement"],
              ["04", "Responsible recovery", "Appropriate downstream channels"],
            ].map(([number, title, text]) => <div className="trust-item" key={title}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div><ArrowUpRight size={17} className="trust-arrow" /></div>)}
          </div>
        </section>

        <section id="about" className="section section-about">
          <div className="site-width about-layout">
            <div className="about-visual reveal">
              <img src="https://images.pexels.com/photos/20379378/pexels-photo-20379378.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1100" alt="Organized industrial containers being handled in a warehouse" loading="lazy" />
              <div className="image-label"><span className="image-label-mark"><Leaf size={18} /></span><div><strong>Material stewardship</strong><small>Responsible from source to handover</small></div></div>
              <div className="about-vertical-label">INDUSTRIAL RESOURCE RECOVERY</div>
            </div>
            <div className="about-copy reveal">
              <div className="eyebrow"><span />About RETRO OILS</div>
              <h2>Good resource recovery<br /><em>starts with good collection.</em></h2>
              <p className="about-lede">We are a hazardous waste management and collection business specializing in Category 5.1 Used Oil. We bridge the gap between waste generators such as workshops, industries and service stations and appropriate authorized recyclers, re-refiners and co-processors.</p>
              <p>RETRO OILS is focused on building a responsible and traceable used-oil collection network for generators and downstream recovery partners. Our objective is to make used-oil disposal more organized, transparent and environmentally responsible while supporting proper documentation and material traceability.</p>
              <div className={`authorization-note${authorized ? " authorization-note-verified" : ""}`}>
                <span className="authorization-note-icon"><ShieldCheck size={18} /></span>
                <span>{authorized ? "We are a licensed hazardous waste management and collection agency specializing in Category 5.1 Used Oil." : company.authorizationStatus === "REGISTERED / AUTHORIZED" ? "Authorization details are pending verification before any approval claim is displayed." : "Our authorization and registration process is in progress."}</span>
              </div>
              <div className="about-flow" aria-label="Generate, collect, document, transfer, recover">
                {["Generate", "Collect", "Document", "Transfer", "Recover"].map((step, index) => <span key={step}>{step}{index < 4 && <ArrowRight size={13} />}</span>)}
              </div>
              <a className="text-link" href="#process">Explore our process <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section id="why" className="section section-why">
          <div className="site-width">
            <div className="section-heading-row">
              <SectionIntro eyebrow="A better way to manage used oil" title="Why work with us?" body="One accountable collection partner, a clearer chain of custody and a more considered path to recovery." />
              <span className="section-side-note">A PARTNER FOR EVERY STEP<br />FROM SOURCE TO TRANSFER</span>
            </div>
            <div className="why-grid">
              {WHY_ITEMS.map(({ number, title, text, Icon }) => <article className="why-item reveal" key={number}><div className="why-item-top"><span>{number}</span><Icon size={25} strokeWidth={1.55} /></div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="services" className="section section-services">
          <div className="site-width">
            <SectionIntro eyebrow="Our services" title="Collection, organized end to end." body="Practical services for waste generators and eligible downstream buyers, shaped around material, route and applicable requirements." />
            <div className="services-list">
              {SERVICE_ITEMS.map(({ number, title, intro, Icon, list, features }) => <article className="service-row reveal" key={number}>
                <div className="service-number">{number}</div>
                <div className="service-title"><span className="service-icon"><Icon size={22} /></span><h3>{title}</h3></div>
                <div className="service-detail"><p>{intro}</p><div className="service-chips">{list.map((item) => <span key={item}>{item}</span>)}</div>{features.length > 0 && <ul className="service-checks">{features.map((feature) => <CheckItem key={feature}>{feature}</CheckItem>)}</ul>}{number === "04" && <p className="regulatory-small">Documentation support subject to applicable regulatory requirements and the responsibilities of the respective parties.</p>}{number === "02" && <div className="aggregation-flow"><span>Multiple generators</span><ArrowRight size={14} /><span>Collection network</span><ArrowRight size={14} /><span>Aggregation</span><ArrowRight size={14} /><span>Appropriate downstream facility</span></div>}</div>
                <button className="service-arrow" type="button" aria-label={number === "05" ? "Open buyer enquiry" : "Request a pickup"} onClick={() => setFormKind(number === "05" ? "buyer" : "pickup")}><ArrowUpRight size={19} /></button>
              </article>)}
            </div>
            <div className="service-footnote"><ShieldCheck size={17} /><span>Material moves to an appropriate authorized downstream entity under the applicable regulatory framework and business arrangement.</span><button className="text-link" type="button" onClick={() => setFormKind("pickup")}>Get a quotation <ArrowRight size={15} /></button></div>
          </div>
        </section>

        <section id="generators" className="section section-generators">
          <div className="site-width generator-layout">
            <div className="generator-copy reveal">
              <div className="eyebrow eyebrow-light"><span />For waste generators</div>
              <h2>Turn used oil disposal into an organized, documented collection process.</h2>
              <p>Helping businesses manage used oil through organized collection and responsible downstream channels.</p>
              <button className="button button-lime" type="button" onClick={() => setFormKind("pickup")}>Request a pickup <ArrowRight size={17} /></button>
              <div className="generator-image-note"><span>01</span><span>From your site to the right next step.</span></div>
            </div>
            <div className="generator-types">
              {GENERATOR_TYPES.map(({ title, text, Icon }, index) => <div className="generator-type reveal" key={title}><div className="generator-type-icon"><Icon size={21} /></div><div><h3>{title}</h3><p>{text}</p></div><span className="generator-index">0{index + 1}</span></div>)}
            </div>
          </div>
        </section>

        <section id="buyers" className="section section-buyers">
          <div className="site-width buyer-layout">
            <div className="buyer-main reveal">
              <div className="eyebrow"><span />For authorized buyers</div>
              <h2>Reliable Category 5.1<br /><em>used oil supply network.</em></h2>
              <p>We work to coordinate collection and supply conversations with authorized recyclers, re-refiners, co-processors and eligible downstream recovery facilities.</p>
              <div className="buyer-benefits">
                {[
                  ["Bulk supply", "Organized collection from multiple generators."],
                  ["Traceable sourcing", "Source and quantity information where applicable."],
                  ["Supply scheduling", "Planned dispatches around buyer requirements."],
                  ["Documentation", "Applicable movement and transaction records."],
                  ["Long-term partnership", "Build a consistent, responsible supply relationship."],
                ].map(([title, text], index) => <div className="buyer-benefit" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
              </div>
              <div className="buyer-cta-row"><button className="button button-primary" type="button" onClick={() => setFormKind("buyer")}>Become a buyer partner <ArrowRight size={17} /></button><a className="text-link" href={whatsappLink(company, buyerMessage)} target="_blank" rel="noreferrer">WhatsApp buyer enquiry <ArrowUpRight size={16} /></a></div>
            </div>
            <div className="buyer-aside reveal">
              <div className="buyer-aside-image"><img src="https://images.pexels.com/photos/31403876/pexels-photo-31403876.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000" alt="Large industrial storage tanks at a process facility" loading="lazy" /></div>
              <div className="buyer-aside-caption"><span className="buyer-aside-icon"><Recycle size={20} /></span><div><strong>Appropriate downstream channels</strong><p>Recycling · Re-refining · Co-processing · Recovery</p></div></div>
              <div className="buyer-aside-disclaimer">Partnerships and buyer eligibility are confirmed individually. No current buyer relationship or authorization is implied.</div>
            </div>
          </div>
        </section>

        <section id="process" className="section section-process">
          <div className="site-width">
            <SectionIntro eyebrow="Our process" title="Clear handoffs. Responsible movement." body="A repeatable path from the point of generation to an appropriate downstream recovery facility." />
            <div className="process-route">
              {PROCESS_STEPS.map(([number, title, text], index) => <article className="process-step reveal" key={number}><div className="process-step-top"><span className="process-number">{number}</span>{index < PROCESS_STEPS.length - 1 && <span className="process-connector"><ArrowRight size={15} /></span>}</div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <div className="process-caution"><span><ShieldCheck size={18} /></span><p>Actual documentation, transport and handling requirements depend on the generator, transporter, collection-agent category and applicable regulatory requirements.</p></div>
          </div>
        </section>

        <section id="compliance" className="section section-compliance">
          <div className="site-width">
            <div className="compliance-head reveal">
              <div><div className="eyebrow"><span />Compliance & documentation</div><h2>Clarity at every handover.</h2><p>Used oil is managed as hazardous waste under the applicable framework, including CPCB’s Used Oil EPR framework and the Hazardous and Other Wastes rules. Requirements vary by entity category and the current directions of competent authorities.</p></div>
              <div className="status-module"><div className="status-module-top"><ShieldCheck size={20} /><span>Current business status</span></div><div className="status-line"><span>GPCB / SPCB authorization</span><strong className={authorized ? "status-verified" : "status-progress"}>{company.authorizationStatus === "REGISTERED / AUTHORIZED" && !authorized ? "PENDING VERIFICATION" : company.authorizationStatus}</strong></div>{authorized && company.registrationNumber && <div className="status-line"><span>Registration number</span><strong className="status-verified">{company.registrationNumber}</strong></div>}{authorized && company.authorizationNumber && <div className="status-line"><span>Authorization number</span><strong className="status-verified">{company.authorizationNumber}</strong></div>}{authorized && company.issuingAuthority && <div className="status-line"><span>Issuing authority</span><strong className="status-verified">{company.issuingAuthority}</strong></div>}{authorized && company.issueDate && <div className="status-line"><span>Issue date</span><strong className="status-verified">{company.issueDate}</strong></div>}{authorized && company.validityDate && <div className="status-line"><span>Validity</span><strong className="status-verified">{company.validityDate}</strong></div>}<div className="status-line"><span>GSTIN</span><strong className={company.gstinStatus === "REGISTERED" ? "status-verified" : "status-progress"}>{company.gstinStatus === "REGISTERED" ? company.gstin : company.gstinStatus}</strong></div><small>Numbers and supporting documents are displayed only after verified details are provided.</small>{company.documentLink && authorized && <a className="status-doc-link" href={company.documentLink} target="_blank" rel="noreferrer">View supporting document <ExternalLink size={14} /></a>}</div>
            </div>
            <div className="compliance-path reveal" aria-label="Generator, collection, transport, documentation, authorized downstream entity, recycling or recovery">
              {["Generator", "Collection", "Transport", "Documentation", "Registered / authorized downstream entity", "Recycling / recovery"].map((step, index) => <div className="compliance-path-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < 5 && <ArrowRight size={17} />}</div>)}
            </div>
            <div className="compliance-docs">
              {COMPLIANCE_DOCS.map(({ title, text, Icon }) => <div className="compliance-doc reveal" key={title}><Icon size={20} /><div><h3>{title}</h3><p>{text}</p></div></div>)}
            </div>
            <div className="compliance-disclaimer"><span>!</span><p>Forms and regulatory requirements shown on this website are provided for general information. Actual requirements depend on the applicable rules, entity category, authorization status, transport arrangement and current directions of the competent authorities.</p></div>
            <div className="government-links"><span>Official information</span>{GOVERNMENT_LINKS.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={13} /></a>)}</div>
          </div>
        </section>

        <section className="section section-ca1">
          <div className="site-width ca1-layout">
            <div className="ca1-copy reveal">
              <div className="eyebrow eyebrow-light"><span />Collection agent model</div>
              <h2>CA-1, made<br /><em>clear.</em></h2>
              <p>CA-1 is the collection-agent category intended for collection and transportation of used oil without a separate storage facility. Collected material may be kept in suitable drums or containers mounted on a vehicle, subject to applicable CPCB requirements.</p>
              <ul className="ca1-checks">
                {["Collection & transportation", "No separate storage facility under the CA-1 model", "Suitable vehicle-mounted containers", "Handover to an authorized recycler / CA-2", "Registration / validation requirements", "Record keeping & applicable transport requirements"].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
              </ul>
              <p className="ca1-caution">CA-1 operations must be conducted according to current CPCB guidelines, applicable HOWM requirements and directions / validation of the concerned SPCB / PCC. This information is not legal advice.</p>
            </div>
            <div className="ca1-visual reveal">
              <div className="ca1-route"><div className="ca1-node"><span>01</span><strong>Generator</strong><small>Used oil source</small></div><div className="ca1-route-line"><span /><ArrowRight size={17} /><span /></div><div className="ca1-node ca1-node-active"><span>02</span><strong>CA-1</strong><small>Collect & transport</small></div><div className="ca1-route-line"><span /><ArrowRight size={17} /><span /></div><div className="ca1-node"><span>03</span><strong>Authorized recycler / CA-2</strong><small>Appropriate downstream entity</small></div></div>
              <div className="ca1-visual-bottom"><span className="ca1-visual-symbol"><Droplet size={23} /></span><p>Collection agent ≠ recycler<br /><strong>Roles stay distinct. Records stay connected.</strong></p></div>
            </div>
          </div>
        </section>

        <section id="industries" className="section section-industries">
          <div className="site-width">
            <div className="industries-heading"><SectionIntro eyebrow="Industries we serve" title="Built around the way businesses work." body="From everyday workshop maintenance to recurring industrial requirements." /><span className="industries-side-mark"><Building2 size={36} strokeWidth={1.25} /><span>Ahmedabad<br />Gujarat</span></span></div>
            <div className="industry-grid">{INDUSTRIES.map(({ label, Icon }, index) => <div className="industry-item reveal" key={`${label}-${index}`}><span className="industry-icon"><Icon size={22} strokeWidth={1.65} /></span><strong>{label}</strong><ArrowUpRight size={15} className="industry-arrow" /></div>)}</div>
          </div>
        </section>

        <section className="sustainability-section">
          <div className="sustainability-photo" role="img" aria-label="Illustrative industrial recovery facility surrounded by greenery" />
          <div className="sustainability-overlay" />
          <div className="site-width sustainability-content">
            <div className="sustainability-copy reveal"><div className="eyebrow eyebrow-light"><span />Resource recovery</div><h2>From used oil<br />to <em>resource recovery.</em></h2><p>Used oil does not have to become an unmanaged waste stream. With responsible collection, safe handling, traceable movement and appropriate recycling or recovery, it can be directed into a more circular resource-management system.</p><a className="light-text-link" href="#process">Follow the material journey <ArrowRight size={17} /></a></div>
            <div className="circular-flow reveal" aria-label="Generate, collect, transport, recycle or recover, resource, circular economy">
              <div className="circular-flow-heading"><Leaf size={19} /> A circular pathway</div>
              {["Generate", "Collect", "Transport", "Recycle / recover", "Resource", "Circular economy"].map((item, index) => <div className="circular-step" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 5 && <ArrowDown size={14} />}</div>)}
            </div>
          </div>
          <div className="sustainability-caption">Illustrative industrial photography · downstream pathways depend on applicable approvals and material suitability</div>
        </section>

        <section id="service-area" className="section section-area">
          <div className="site-width area-layout">
            <div className="area-copy reveal">
              <div className="eyebrow"><span />Service area</div>
              <h2>Ahmedabad first.<br /><em>Gujarat next.</em></h2>
              <p>Ahmedabad is the initial business focus. Pickup availability in Ahmedabad and nearby industrial clusters is confirmed case by case.</p>
              <div className="area-tags">{areas.map((area) => <span key={area}><MapPin size={13} />{area}</span>)}</div>
              <div className="area-note"><Clock3 size={17} /><p>Service availability depends on collection route, quantity, downstream facility arrangement and applicable regulatory requirements.</p></div>
              <div className="area-data"><div><small>MARKET</small><strong>Gujarat</strong></div><div><small>MODEL</small><strong>Collection + supply</strong></div><div><small>FOCUS</small><strong>Traceability</strong></div></div>
            </div>
            <div className="map-panel reveal"><div className="map-panel-label"><span><MapPin size={15} />Ahmedabad, Gujarat, India</span><small>Indicative service-area reference only</small></div><iframe title="Map showing Ahmedabad, Gujarat, India" src="https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat%2C%20India&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-panel-caption"><Map size={16} /><span>No private business address is published. Exact pickup availability is confirmed before booking.</span></div></div>
          </div>
        </section>

        <section id="faq" className="section section-faq">
          <div className="site-width faq-layout">
            <div className="faq-aside reveal"><div className="eyebrow"><span />Common questions</div><h2>Clear answers.<br /><em>Better decisions.</em></h2><p>Need help with a specific generator or buyer requirement? Talk with the RETRO OILS team.</p><button className="text-link" type="button" onClick={() => setFormKind("pickup")}>Ask a question <ArrowRight size={17} /></button><div className="faq-watermark"><Droplet size={83} strokeWidth={0.8} /></div></div>
            <div className="faq-list">{faqs.map((faq, index) => <article className="faq-item reveal" data-open={activeFaq === index ? "true" : "false"} key={`${faq.question}-${index}`}><h3><button type="button" aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span className="faq-num">{String(index + 1).padStart(2, "0")}</span><span>{faq.question}</span><ChevronDown size={18} /></button></h3>{activeFaq === index && <div className="faq-answer" id={`faq-answer-${index}`}><p>{faq.answer}</p></div>}</article>)}</div>
          </div>
        </section>

        <section className="final-cta">
          <div className="site-width final-cta-inner reveal">
            <div><div className="eyebrow eyebrow-light"><span />Category 5.1 used oil collection & supply</div><h2>Have used oil<br /><em>to collect?</em></h2><p>Let RETRO OILS help organize your collection and downstream transfer requirements.</p><span className="final-cta-location"><MapPin size={15} />Ahmedabad, Gujarat <i /> Category 5.1 Used Oil Collection & Supply</span></div>
            <div className="final-cta-actions"><button className="button button-lime" type="button" onClick={() => setFormKind("pickup")}>Request pickup <ArrowRight size={17} /></button><a className="button button-light-outline" href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer"><MessageCircle size={17} />WhatsApp us</a><a className="button button-light-outline" href={phoneLink(company.phone)}><Phone size={16} />Call now</a></div>
            <div className="cta-orbit" aria-hidden="true"><div /><div /><div /><Droplet size={40} /></div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="site-width">
            <div className="contact-header reveal"><SectionIntro eyebrow="Get in touch" title="Let’s talk about your used oil requirements." body="Need a pickup? Looking for a reliable supply partner? Contact RETRO OILS." /><div className="contact-heading-side"><span>Talk to our team</span><strong>Amraiwadi, Ahmedabad</strong></div></div>
            <div className="contact-layout">
              <div className="contact-details reveal">
                <div className="contact-method"><span className="contact-method-icon"><Phone size={19} /></span><div><small>PHONE</small><a href={phoneLink(company.phone)}>{company.phone}</a></div></div>
                <div className="contact-method"><span className="contact-method-icon"><MessageCircle size={19} /></span><div><small>WHATSAPP</small><a href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer">{company.whatsapp}</a></div></div>
                <div className="contact-method"><span className="contact-method-icon"><Mail size={19} /></span><div><small>EMAIL</small><a href={company.email === DEFAULT_COMPANY.email ? "#contact-form" : `mailto:${company.email}`}>{company.email}</a></div></div>
                <div className="contact-method"><span className="contact-method-icon"><MapPin size={19} /></span><div><small>BUSINESS LOCATION</small><strong>{company.address}</strong></div></div>
                <div className="contact-operating-area"><span>OPERATING AREA</span><strong>Ahmedabad & surrounding industrial areas</strong><small>Subject to route and collection feasibility</small><small>{company.businessHours}</small></div>
                <div className="social-row" aria-label="Social media"><span>FOLLOW</span><SocialLink href={company.linkedin} label="LinkedIn" /><SocialLink href={company.instagram} label="Instagram" /><SocialLink href={company.facebook} label="Facebook" /><a href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div>
              </div>
              <div className="contact-form-shell reveal" id="contact-form">
                {contactSent ? <div className="contact-sent" role="status"><CheckCircle2 size={27} /><h3>Thank you for reaching out.</h3><p>Your message has been saved in this browser preview. A secure email and server workflow must be connected before launch.</p><button type="button" className="text-link" onClick={() => setContactSent(false)}>Send another message <ArrowRight size={16} /></button></div> : <form className="business-form contact-form" onSubmit={submitContact}>
                  <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <div className="contact-form-heading"><span>BUSINESS ENQUIRY</span><h3>How can we help?</h3></div>
                  <div className="form-grid">
                    <Field label="Your name" required><input name="name" autoComplete="name" required placeholder="Full name" /></Field>
                    <Field label="Company name"><input name="company" autoComplete="organization" placeholder="Business name" /></Field>
                    <Field label="Email" required><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></Field>
                    <Field label="Phone"><input name="phone" type="tel" inputMode="tel" placeholder="+91" /></Field>
                    <Field label="How can we help?" className="field-span"><textarea name="message" rows={4} required placeholder="Tell us a little about your requirement." /></Field>
                  </div>
                  <p className="form-privacy"><ShieldCheck size={15} />Your enquiry information is used only to respond to your business enquiry.</p>
                  <button className="button button-primary" type="submit">Send enquiry <ArrowRight size={16} /></button>
                </form>}
              </div>
            </div>

            <div className="operations-gallery">
              <div className="operations-gallery-head"><div><div className="eyebrow"><span />Our operations</div><h2>Care at every handover.</h2></div><span>Illustrative industry photography</span></div>
              <div className="gallery-grid">
                {[
                  ["Collection", "https://images.pexels.com/photos/14637831/pexels-photo-14637831.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=850", "A well-equipped industrial workshop"],
                  ["Containers", "https://images.pexels.com/photos/39874186/pexels-photo-39874186.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=850", "Industrial metal drums arranged for material handling"],
                  ["Industrial facilities", "https://images.pexels.com/photos/38601485/pexels-photo-38601485.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=850", "An industrial storage and process facility"],
                  ["Recovery pathways", "https://images.pexels.com/photos/10396410/pexels-photo-10396410.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=850", "Aerial view of an industrial process facility"],
                ].map(([label, src, alt]) => <figure className="gallery-item reveal" key={label}><img src={src} alt={alt} loading="lazy" /><figcaption>{label}<ArrowUpRight size={15} /></figcaption></figure>)}
              </div>
            </div>

            <div className="knowledge-centre">
              <div className="knowledge-head"><div><div className="eyebrow"><span />Knowledge centre</div><h2>Used oil, understood.</h2><p>Practical reading on collection, documentation and environmental compliance.</p><div className="knowledge-categories">Used Oil Management <i /> Category 5.1 <i /> EPR <i /> Collection <i /> Transportation <i /> Documentation <i /> Environmental Compliance <i /> Recycling <i /> Industrial Waste Management</div></div><a className="text-link" href="#compliance">Explore compliance <ArrowRight size={16} /></a></div>
              <div className="article-grid">{articles.slice(0, 4).map((article, index) => <button className="article-card reveal" type="button" key={`${article.title}-${index}`} onClick={() => setActiveArticle(article)}><span className="article-category">{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p><span className="article-read">Read article <ArrowUpRight size={15} /></span></button>)}</div>
            </div>

            <div className="testimonial-placeholder"><span className="quote-mark">“</span><p>Customer testimonials will appear here.</p><span>Real customer stories, published with permission.</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-width">
          <div className="footer-top">
            <div className="footer-brand"><Logo inverse /><p>Category 5.1 Used Oil<br />Collection & Supply Partner</p><span className="footer-slogan">Responsible collection.<br />Traceable movement.<br />Resource recovery.</span></div>
            <div className="footer-column"><h3>Company</h3><a href="#about">About us</a><a href="#services">Services</a><a href="#process">Process</a><a href="#industries">Industries</a><a href="#contact">Contact</a></div>
            <div className="footer-column"><h3>Business</h3><a href="#generators">For generators</a><a href="#buyers">For buyers</a><button type="button" onClick={() => setFormKind("pickup")}>Request pickup</button><button type="button" onClick={() => setFormKind("buyer")}>Buyer enquiry</button></div>
            <div className="footer-column"><h3>Compliance</h3><a href="#compliance">Compliance</a><a href="#compliance">Documentation</a>{GOVERNMENT_LINKS.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={12} /></a>)}</div>
            <div className="footer-column footer-contact"><h3>Contact</h3><a href={phoneLink(company.phone)}>{company.phone}</a><a href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer">WhatsApp</a><a href={company.email === DEFAULT_COMPANY.email ? "#contact" : `mailto:${company.email}`}>{company.email}</a><span>{company.address}</span></div>
          </div>
          <div className="footer-authorization"><ShieldCheck size={16} /><span>Authorization status: {company.authorizationStatus === "REGISTERED / AUTHORIZED" && !authorized ? "PENDING VERIFICATION" : company.authorizationStatus}. No government approval, certificate or authorization is represented unless explicitly verified and documented.</span></div>
          <div className="footer-bottom"><span>© 2026 RETRO OILS. All rights reserved.</span><div><button type="button" onClick={() => setLegalPage("privacy")}>Privacy policy</button><button type="button" onClick={() => setLegalPage("terms")}>Terms & conditions</button><button type="button" onClick={() => setLegalPage("disclaimer")}>Disclaimer</button><button type="button" className="admin-access" onClick={() => setAdminOpen(true)}>Local admin</button></div></div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer" aria-label="Enquire with RETRO OILS on WhatsApp"><MessageCircle size={22} /><span>WhatsApp</span></a>
      <div className="mobile-action-bar"><a href={phoneLink(company.phone)}><Phone size={17} /><span>Call</span></a><a href={whatsappLink(company, pickupMessage)} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>WhatsApp</span></a><button type="button" onClick={() => setFormKind("pickup")}><Droplet size={17} /><span>Pickup</span></button></div>

      {formKind && <LeadModal kind={formKind} onClose={() => setFormKind(null)} onSubmit={(kind, payload) => addLead(kind === "pickup" ? "Pickup Request" : "Buyer Enquiry", payload)} />}
      {legalPage && <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />}
      {activeArticle && <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />}
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} company={company} onSaveCompany={setCompany} leads={leads} onUpdateLead={(updated) => setLeads((current) => current.map((lead) => lead.id === updated.id ? updated : lead))} faqs={faqs} onSaveFaqs={setFaqs} articles={articles} onSaveArticles={setArticles} />}
    </>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const mark = label === "Instagram" ? <Camera size={17} /> : <strong>{label === "LinkedIn" ? "in" : "f"}</strong>;
  return href ? <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-brand">{mark}</a> : <span className="social-disabled social-brand" aria-label={`${label} link not configured`} title={`${label} link not configured`}>{mark}</span>;
}

export default App;