# ShopNow

Aplikacion e-commerce i ndërtuar me *Next.js, zhvilluar si projekt grupi për lëndën *Zhvillim i Ueb-it në Anën e Klientit. ShopNow lejon përdoruesit të shfletojnë produkte, të menaxhojnë shportën, të ruajnë produkte të preferuara, të regjistrohen/hyjnë, dhe të ndjekin porositë — me panel të veçantë admini për menaxhimin e dyqanit.

---

## Link Live
(shto linkun nga Vercel pas deployment)

## Screenshots
(shto foto këtu para dorëzimit — Home, Product Details, Cart, Dashboard, Favorites)

---

## Teknologjitë e Përdorura

| Shtresa | Teknologjia |
|---|---|
| Framework | Next.js 13 (Pages Router) |
| Stilizim | Tailwind CSS |
| Autentifikim | NextAuth.js (Credentials provider) |
| Databaza | MongoDB Atlas (Mongoose ODM) |
| Menaxhim State | React Context API (utils/Store.js) + custom hooks |
| Formularë & Validim | react-hook-form |
| HTTP Client | Axios |
| Deployment | Vercel |

---

## Arkitektura e Projektit

Projekti ndjek arkitekturën standarde të *Next.js Pages Router*, ku frontend dhe backend gjenden brenda të njëjtit projekt:


shopnow/
├── components/        → Komponentë të ripërdorshëm (Layout, ProductItem, DropdownLink)
├── hooks/              → Custom React hooks (useFavorites)
├── middleware.js       → Mbrojtje rrugësh (kontroll rolesh user/admin)
├── models/             → Skema Mongoose (User, Product, Order, Message)
├── pages/              → Faqet e frontend-it (routing bazuar në file)
│   └── api/            → Rrugët e backend-it (serverless functions)
├── public/             → Assets statike (foto, ikona)
├── styles/             → Tailwind CSS global
├── utils/              → Ndihmës (lidhja me DB, Context Store, trajtim gabimesh)


*Frontend* — çdo file brenda pages/ (përveç pages/api/) është një faqe e shfaqur te klienti, duke përdorur konventat e routing-ut të Next.js (p.sh. pages/product/[slug].js për faqe dinamike produktesh).

*Backend* — çdo file brenda pages/api/ është një endpoint API serverless (p.sh. pages/api/seed.js, pages/api/auth/[...nextauth].js, pages/api/contact.js), që xhiron në të njëjtin server Next.js, i lidhur direkt me MongoDB përmes utils/db.js.

*Autentifikimi & Autorizimi* — menaxhohet nga NextAuth.js me Credentials provider (email/password). middleware.js ndërhyn te kërkesat drejt rrugëve të mbrojtura (/admin, /dashboard, /profile) dhe ridrejton përdoruesit e paautentifikuar ose të paautorizuar te /login.

*Marrja e të Dhënave* — aplikacioni përdor një kombinim getServerSideProps (të dhëna të freskëta për çdo kërkesë, p.sh. detajet e porosisë), getStaticProps/getStaticPaths me ISR (listimi i produkteve dhe faqet e detajeve), dhe fetching nga ana e klientit me Axios (statistika dashboard, forma kontakti, sinkronizimi i favoriteve).

*Menaxhimi i State-it* — shporta globale menaxhohet përmes React Context API (utils/Store.js) të kombinuar me useReducer dhe ruajtje në cookies. Favoritet menaxhohen përmes një custom hook të veçantë, hooks/useFavorites.js, mbështetur nga localStorage.

---

## Funksionalitetet

- *Home* — faqe kryesore me produkte të veçuara dhe navigim
- *About* — informacion mbi dyqanin dhe si funksionon blerja
- *Contact* — formë kontakti me validim, e ruajtur në MongoDB
- *Login / Register* — autentifikim përmes NextAuth, me validim formash
- *Dashboard* — përmbledhje personale e përdoruesit (profil, porosi, favorite)
- *Admin Panel* — menaxhim produktesh, porosish, dhe userash (vetëm admin, e mbrojtur nga middleware)
- *Products / Product Details* — listim dhe detaje produktesh dinamike (SSG + ISR)
- *Cart* — shto/hiq produkte, ruajtur përmes cookies dhe Context API
- *Favorites* — ruaj/hiq produkte përmes ikonës së zemrës, mbështetur nga custom hook
- *Profile* — shiko dhe përditëso të dhënat e llogarisë
- *Order History* — ndiq porositë e kaluara, statusin e pagesës dhe dërgesës
- *Search* — kërko produkte sipas fjalëve kyçe
- *Middleware me Role* — mbron rrugët /admin, /dashboard, dhe /profile

---

## Instalimi

1. Klono repon:
   bash
   git clone https://github.com/Anita592/ShopNow.git
   cd ShopNow
   
2. Instalo librat:
   bash
   npm install
   
3. Krijo file .env në rrënjë të projektit:
   
   MONGODB_URI=connection_string_i_yt
   NEXTAUTH_SECRET=fjala_sekrete_e_jote
   
4. Xhiro serverin lokal:
   bash
   npm run dev
   
5. Mbush databazën me produkte shembull (një herë e vetme):
   
   http://localhost:3000/api/seed
   

---

## Grupi & Kontributet

| Anëtari | Kontributi |
|---|---|
| *Anita* | Setup fillestar i projektit, konfigurimi i MongoDB dhe NextAuth, krijimi i repos GitHub, faqja About, faqja Contact (formë + API + model DB), ridizajnimi i faqeve Login/Register, ridizajnimi i faqes Order History, integrimi i ikonës Favorites (zemra), branding-u ShopNow, dokumentimi |
| *Rinor* | Middleware për kontroll rolesh (/admin, /dashboard, /profile), stilizimi i faqes Favorites |
| *Leart* | Faqja Dashboard (përmbledhje profili/porosive/favoriteve), custom hook useFavorites |

---

## Shënime

Ky projekt është ndërtuar mbi një bazë open-source Next.js e-commerce, e zgjeruar dhe e përshtatur sipas kërkesave të lëndës: faqe shtesë (About, Contact, Dashboard, Favorites), custom hook, middleware me role, ridizajnim i UI-së në faqet kryesore, dhe dokumentim i plotë.