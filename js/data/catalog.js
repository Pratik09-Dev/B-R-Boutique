/**
 * Store Product Catalog, Starting Prices & Weave Guide Data
 */
'use strict';

window.AppData = window.AppData || {};
window.AppData.CATEGORIES = [
      { id: 'all', en: 'All Varieties', hi: 'सभी वैरायटी', or: 'ସମସ୍ତ ଭେରାଇଟି' },
      { id: 'sarees', en: 'Sarees', hi: 'साड़ियाँ', or: 'ଶାଢ଼ୀ' },
      { id: 'ladies', en: 'Ladies Kurtis & Sheets', hi: 'लेडीज़ कुर्ती व कपड़ा', or: 'କୁର୍ଟି ଓ ଡ୍ରେସ୍ କପଡ଼ା' },
      { id: 'mens', en: "Men's Shirts & Sports", hi: 'पुरुष शर्ट व स्पोर्ट्स', or: 'ପୁରୁଷ ସାର୍ଟ ଓ ସ୍ପୋର୍ଟସ୍' },
      { id: 'home', en: 'Lungi, Towel, Shawl & Bedsheet', hi: 'लुंगी, तौलिया, शॉल व बेडशीट', or: 'ଲୁଙ୍ଗି, ଗାମୁଛା, ଶାଲ୍ ଓ ବେଡସିଟ୍' },
      { id: 'essentials', en: 'Inner Items & More', hi: 'इनर आइटम व अन्य', or: 'ଇନର୍ ଆଇଟମ୍ ଓ ଅନ୍ୟାନ୍ୟ' }
    ];

    window.AppData.PRODUCTS = [
      {
        id: 'sambalpuri-saree',
        category: 'sarees',
        image: 'assets/images/sambalpuri-saree.jpg',
        palette: ['#991B1B', '#111827', '#FAF6F0'],
        en: { title: 'Odisha Sambalpuri Saree (Handloom & Print)', price: 'Print starts from ₹400 • Handloom starts from ₹900', tag: '100% Pure Cotton • Handloom & Print Variants', occasion: 'Temple, Festive & Daily Wear', fabric: 'Crafted in breathable 100% pure cotton across both soft everyday printed drapes and traditional tie-dyed Bandha handloom weaves, featuring iconic Pasapalli checks, Shankha (conch), and Chakra borders with a rich contrast pallu.' },
        hi: { title: 'ओडिशा संबलपुरी साड़ी (हैंडलूम और प्रिंट)', price: 'प्रिंट ₹400 से शुरू • हैंडलूम ₹900 से शुरू', tag: '100% शुद्ध सूती (Pure Cotton) • प्रिंट व हैंडलूम', occasion: 'मंदिर, त्योहार व दैनिक पहनावा', fabric: '100% शुद्ध सूती धागों से निर्मित—दैनिक पहनावे के लिए मुलायम प्रिंट और पारंपरिक बंधा हैंडलूम दोनों में उपलब्ध, जिसमें प्रसिद्ध पसापल्ली चेक, शंख और चक्र बॉर्डर व आकर्षक पल्लू शामिल हैं।' },
        or: { title: 'ଓଡ଼ିଶା ସମ୍ବଲପୁରୀ ଶାଢ଼ୀ (ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍)', price: 'ପ୍ରିଣ୍ଟ୍ ₹୪୦୦ ରୁ ଆରମ୍ଭ • ହସ୍ତତନ୍ତ ₹୯୦୦ ରୁ ଆରମ୍ଭ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍ ଭେରାଇଟି', occasion: 'ମନ୍ଦିର, ପର୍ବପର୍ବାଣି ଓ ଦୈନନ୍ଦିନ', fabric: '୧୦୦% ଖାଣ୍ଟି ସୁତାରେ ପ୍ରସ୍ତୁତ—ଦୈନନ୍ଦିନ ବ୍ୟବହାର ପାଇଁ କୋମଳ ପ୍ରିଣ୍ଟ୍ ଏବଂ ପାରମ୍ପରିକ ବାନ୍ଧ ହସ୍ତତନ୍ତ ଉଭୟରେ ଉପଲବ୍ଧ, ଯେଉଁଥିରେ ପାଶାପାଲି ଚେକ୍, ଶଙ୍ଖ ଓ ଚକ୍ର ବର୍ଡର ସହ ସୁନ୍ଦର ପଣତ ରହିଛି।' }
      },
      {
        id: 'katki-saree',
        category: 'sarees',
        image: 'assets/images/katki-saree.jpg',
        palette: ['#14532D', '#7F1D1D', '#C59B48'],
        en: { title: 'Odisha Katki Saree (Handloom & Print)', price: 'Print starts from ₹400 • Handloom starts from ₹900', tag: '100% Pure Cotton • Handloom & Print Variants', occasion: 'Puja, Wedding & Gifting', fabric: 'Woven and printed in lightweight 100% pure cotton from the Cuttack–Nuapatna weaving belt, admired for its delicate temple-spire (Kumbha) borders, intricate floral creepers, and airy coastal comfort.' },
        hi: { title: 'ओडिशा कटकी साड़ी (हैंडलूम और प्रिंट)', price: 'प्रिंट ₹400 से शुरू • हैंडलूम ₹900 से शुरू', tag: '100% शुद्ध सूती (Pure Cotton) • प्रिंट व हैंडलूम', occasion: 'पूजा, शादी व उपहार', fabric: 'कटक और नुआपटना की बुनाई परंपरा से प्रेरित 100% शुद्ध सूती साड़ियाँ—प्रिंट और हैंडलूम दोनों में उपलब्ध, जो अपने बारीक मंदिर (कुंभ) बॉर्डर, फूलों की बेल और हल्केपन के लिए जानी जाती हैं।' },
        or: { title: 'ଓଡ଼ିଶା କଟକୀ ଶାଢ଼ୀ (ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍)', price: 'ପ୍ରିଣ୍ଟ୍ ₹୪୦୦ ରୁ ଆରମ୍ଭ • ହସ୍ତତନ୍ତ ₹୯୦୦ ରୁ ଆରମ୍ଭ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍ ଭେରାଇଟି', occasion: 'ପୂଜା, ବିବାହ ଓ ଉପହାର', fabric: 'କଟକ ଓ ନୂଆପାଟଣା ପରମ୍ପରାର ୧୦୦% ଖାଣ୍ଟି ସୁତା ଶାଢ଼ୀ—ପ୍ରିଣ୍ଟ୍ ଏବଂ ହସ୍ତତନ୍ତ ଉଭୟରେ ଉପଲବ୍ଧ, ଯାହା ସୂକ୍ଷ୍ମ ଦେଉଳ (କୁମ୍ଭ) ବର୍ଡର, ଫୁଲ ଡିଜାଇନ୍ ଏବଂ ଆରାମଦାୟକ ପିନ୍ଧଣି ପାଇଁ ପ୍ରସିଦ୍ଧ।' }
      },
      {
        id: 'fancy-saree',
        category: 'sarees',
        image: 'assets/images/fancy-sarees.jpg',
        palette: ['#B83B2A', '#14532D', '#EAB308'],
        en: { title: 'Fancy Saree', price: 'Starts from ₹550', tag: 'Partywear & Festive Collection • Both Stores', occasion: 'Celebrations & Evening Wear', fabric: 'Graceful partywear and festive sarees crafted with shimmering zari borders, delicate thread embroidery, and effortless pleating—ideal for weddings, family functions, and special evenings.' },
        hi: { title: 'फैंसी साड़ी', price: '₹550 से शुरू', tag: 'पार्टीवियर व उत्सव कलेक्शन • दोनों स्टोर', occasion: 'उत्सव व शाम के कार्यक्रम', fabric: 'चमकदार ज़री बॉर्डर, बारीक कढ़ाई और आसानी से पहने जाने वाले फेस्टिव फैब्रिक में तैयार आकर्षक फैंसी साड़ियाँ—शादी, पूजा और पारिवारिक समारोहों के लिए उपयुक्त।' },
        or: { title: 'ଫ୍ୟାନ୍ସି ଶାଢ଼ୀ', price: '₹୫୫୦ ରୁ ଆରମ୍ଭ', tag: 'ପାର୍ଟିୱେୟାର ଓ ଉତ୍ସବ କଲେକ୍ସନ୍ • ଉଭୟ ଦୋକାନ', occasion: 'ଉତ୍ସବ ଓ ପାର୍ଟି', fabric: 'ଆକର୍ଷଣୀୟ ଜରି ବର୍ଡର, ସୂକ୍ଷ୍ମ ଏମ୍ବ୍ରୋଏଡେରୀ କାମ ଏବଂ ହାଲୁକା କପଡ଼ାରେ ପ୍ରସ୍ତୁତ ଫ୍ୟାନ୍ସି ଶାଢ଼ୀ—ବିବାହ, ପୂଜା ଏବଂ ପାରିବାରିକ ଉତ୍ସବ ପାଇଁ ବିଶେଷ ଉପଯୁକ୍ତ।' }
      },
      {
        id: 'ikat-saree',
        category: 'sarees',
        image: 'assets/images/ikat-fabric-sheet.jpg',
        palette: ['#B83B2A', '#C59B48', '#182235'],
        en: { title: 'Pure Cotton Ikat Saree (Handloom & Print)', price: 'Print starts from ₹400 • Handloom starts from ₹900', tag: '100% Pure Cotton • Bandha Weave & Print', occasion: 'Heritage & Occasion Wear', fabric: 'Authentic Odisha Bandha (ikat) artistry in 100% pure cotton, offering both vibrant printed designs and yarn-resisted handloom weaves where motifs appear crisp on both sides of the fabric.' },
        hi: { title: 'शुद्ध कॉटन इकत साड़ी (हैंडलूम और प्रिंट)', price: 'प्रिंट ₹400 से शुरू • हैंडलूम ₹900 से शुरू', tag: '100% शुद्ध सूती • बंधा बुनाई व प्रिंट', occasion: 'पारंपरिक व खास अवसर', fabric: '100% शुद्ध सूती में ओडिशा की पारंपरिक बंधा (इकत) कला—प्रिंट और हैंडलूम दोनों वैरायटी में उपलब्ध, जहाँ बुनाई के दोनों तरफ स्पष्ट और सुंदर पैटर्न दिखाई देते हैं।' },
        or: { title: 'ଖାଣ୍ଟି ସୁତା ଇକତ୍ ଶାଢ଼ୀ (ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍)', price: 'ପ୍ରିଣ୍ଟ୍ ₹୪୦୦ ରୁ ଆରମ୍ଭ • ହସ୍ତତନ୍ତ ₹୯୦୦ ରୁ ଆରମ୍ଭ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ବାନ୍ଧ ଓ ପ୍ରିଣ୍ଟ୍', occasion: 'ପାରମ୍ପରିକ ଓ ଉତ୍ସବ', fabric: '୧୦୦% ଖାଣ୍ଟି ସୁତାରେ ଓଡ଼ିଶାର ପାରମ୍ପରିକ ବାନ୍ଧ (ଇକତ୍) କଳା—ପ୍ରିଣ୍ଟ୍ ଓ ହସ୍ତତନ୍ତ ଉଭୟରେ ଉପଲବ୍ଧ, ଯେଉଁଥିରେ କପଡ଼ାର ଉଭୟ ପାର୍ଶ୍ୱରେ ସ୍ପଷ୍ଟ ଓ ସୁନ୍ଦର ଡିଜାଇନ୍ ଫୁଟି ଉଠେ।' }
      },
      {
        id: 'ladies-kurti',
        category: 'ladies',
        image: 'assets/images/ladies-kurtis.jpg',
        palette: ['#D97706', '#0F766E', '#BE185D'],
        en: { title: 'Ladies Pure Cotton Sambalpuri, Katki & Fancy Kurti', price: 'Starts from ₹300', tag: '100% Pure Cotton • Handloom & Print • All Sizes', occasion: 'Daily Travel & Festive Outings', fabric: 'Skin-friendly 100% pure cotton kurtis in authentic Sambalpuri & Katki motifs (both Print and Handloom variants) alongside embroidered fancy kurtis—tailored across all sizes for travel, office, and festive wear.' },
        hi: { title: 'लेडीज़ शुद्ध कॉटन संबलपुरी, कटकी व फैंसी कुर्ती', price: '₹300 से शुरू', tag: '100% शुद्ध सूती • हैंडलूम व प्रिंट • सभी साइज़', occasion: 'यात्रा व त्योहारों के लिए', fabric: '100% शुद्ध सूती में संबलपुरी व कटकी डिज़ाइन (प्रिंट और हैंडलूम दोनों में) तथा सुंदर फैंसी कुर्तियाँ—यात्रा, ऑफिस और त्योहारों के लिए सभी साइज़ में उपलब्ध।' },
        or: { title: 'ମହିଳାଙ୍କ ଖାଣ୍ଟି ସୁତା ସମ୍ବଲପୁରୀ, କଟକୀ ଓ ଫ୍ୟାନ୍ସି କୁର୍ଟି', price: '₹୩୦୦ ରୁ ଆରମ୍ଭ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍ • ସବୁ ସାଇଜ୍', occasion: 'ଯାତ୍ରା ଓ ପର୍ବପର୍ବାଣି', fabric: '୧୦୦% ଖାଣ୍ଟି ସୁତାରେ ପ୍ରସ୍ତୁତ ସମ୍ବଲପୁରୀ ଓ କଟକୀ କୁର୍ଟି (ପ୍ରିଣ୍ଟ୍ ଓ ହସ୍ତତନ୍ତ) ଏବଂ ସୁନ୍ଦର ଫ୍ୟାନ୍ସି କୁର୍ଟି—ଯାତ୍ରା, ଅଫିସ୍ ଓ ପର୍ବପର୍ବାଣି ପାଇଁ ସବୁ ସାଇଜ୍‌ରେ ଉପଲବ୍ଧ।' }
      },
      {
        id: 'mens-half-shirt',
        category: 'mens',
        image: 'assets/images/mens-handloom-shirts.jpg',
        palette: ['#1E3A8A', '#7F1D1D', '#FAF6F0'],
        en: { title: "Men's Pure Cotton Sambalpuri & Katki Half Shirt", price: 'Starts from ₹300', tag: '100% Pure Cotton • Handloom & Print • All Sizes', occasion: 'Coastal Weather & Cultural Wear', fabric: 'Breathable 100% pure cotton men’s half-sleeve shirts featuring classic Sambalpuri geometric Bandha and Katki borders in both Print and Handloom weaves—ideal for Puri’s coastal breeze, temple visits, and cultural gatherings.' },
        hi: { title: 'पुरुषों की शुद्ध कॉटन संबलपुरी व कटकी हाफ शर्ट', price: '₹300 से शुरू', tag: '100% शुद्ध सूती • हैंडलूम व प्रिंट • सभी साइज़', occasion: 'तटीय मौसम व पारंपरिक पहनावा', fabric: '100% शुद्ध सूती में पारंपरिक संबलपुरी और कटकी पैटर्न वाली पुरुषों की आरामदायक हाफ शर्ट (प्रिंट व हैंडलूम दोनों में)—मंदिर दर्शन, यात्रा और खास अवसरों के लिए बेहतरीन।' },
        or: { title: 'ପୁରୁଷଙ୍କ ଖାଣ୍ଟି ସୁତା ସମ୍ବଲପୁରୀ ଓ କଟକୀ ହାଫ୍ ସାର୍ଟ', price: '₹୩୦୦ ରୁ ଆରମ୍ଭ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟ୍ • ସବୁ ସାଇଜ୍', occasion: 'ଗରମ ଦିନ ଓ ପାରମ୍ପରିକ ପୋଷାକ', fabric: '୧୦୦% ଖାଣ୍ଟି ସୁତାରେ ପାରମ୍ପରିକ ସମ୍ବଲପୁରୀ ଓ କଟକୀ ଡିଜାଇନ୍‌ର ଆରାମଦାୟକ ପୁରୁଷ ହାଫ୍ ସାର୍ଟ (ପ୍ରିଣ୍ଟ୍ ଓ ହସ୍ତତନ୍ତ ଉଭୟରେ)—ମନ୍ଦିର ଦର୍ଶନ, ଯାତ୍ରା ଓ ଉତ୍ସବ ପାଇଁ ଉତ୍ତମ।' }
      },
      {
        id: 'cloth-sheet',
        category: 'ladies',
        image: 'assets/images/ikat-fabric-sheet.jpg',
        palette: ['#182235', '#B83B2A', '#C59B48'],
        en: { title: 'Pure Cotton Sambalpuri & Katki Cloth Sheet', price: 'Print & Handloom Fabrics In-Store', tag: '100% Pure Cotton • Unstitched Dress Material', occasion: 'Custom Tailoring & Gifting', fabric: 'Unstitched 100% pure cotton Sambalpuri and Katki fabric lengths in both Print and Handloom weaves—ideal for custom-tailored salwar suits, kurtas, blouses, and coordinated family outfits.' },
        hi: { title: 'शुद्ध कॉटन संबलपुरी व कटकी क्लॉथ शीट', price: 'प्रिंट व हैंडलूम कपड़ा उपलब्ध', tag: '100% शुद्ध सूती • अनस्टिच्ड ड्रेस मटेरियल', occasion: 'कस्टम सिलाई व उपहार', fabric: 'सूट, ब्लाउज़ या कुर्ता सिलवाने के लिए 100% शुद्ध सूती संबलपुरी और कटकी अनस्टिच्ड कपड़ा—प्रिंट व हैंडलूम दोनों में उपलब्ध।' },
        or: { title: 'ଖାଣ୍ଟି ସୁତା ସମ୍ବଲପୁରୀ ଓ କଟକୀ କପଡ଼ା (କ୍ଲଥ୍ ସିଟ୍)', price: 'ପ୍ରିଣ୍ଟ୍ ଓ ହସ୍ତତନ୍ତ କପଡ଼ା ଉପଲବ୍ଧ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ଅନଷ୍ଟିଚ୍ ଡ୍ରେସ୍ କପଡ଼ା', occasion: 'ସିଲେଇ ଓ ଉପହାର', fabric: 'ସୁଟ୍, ବ୍ଲାଉଜ୍ କିମ୍ବା କୁର୍ତ୍ତା ସିଲେଇ ପାଇଁ ୧୦୦% ଖାଣ୍ଟି ସୁତା ସମ୍ବଲପୁରୀ ଓ କଟକୀ କପଡ଼ା—ପ୍ରିଣ୍ଟ୍ ଓ ହସ୍ତତନ୍ତ ଉଭୟରେ ଉପଲବ୍ଧ।' }
      },
      {
        id: 'home-loom-bundle',
        category: 'home',
        image: 'assets/images/lungi-towel-shawl-bedsheet.jpg',
        palette: ['#9A3412', '#1E3A8A', '#15803D'],
        en: { title: 'Pure Cotton Sambalpuri & Katki Lungi, Towel, Shawl & Bedsheet', price: 'Print & Handloom Range In-Store', tag: '100% Pure Cotton • Handloom & Print Variants', occasion: 'Daily Comfort & Family Souvenirs', fabric: 'Soft, colorfast 100% pure cotton handloom and printed lungis, absorbent traditional Odia gamuchha towels, cozy woven shawls, and double/single Sambalpuri & Katki bedsheets.' },
        hi: { title: 'शुद्ध कॉटन संबलपुरी व कटकी लुंगी, तौलिया, शॉल व बेडशीट', price: 'प्रिंट व हैंडलूम रेंज उपलब्ध', tag: '100% शुद्ध सूती • हैंडलूम व प्रिंटेड वैरायटी', occasion: 'दैनिक उपयोग व पारिवारिक उपहार', fabric: 'पक्के रंग और 100% शुद्ध सूती धागों से बने हैंडलूम व प्रिंटेड लुंगी, सूती गमछा/तौलिया, गर्म शॉल और संबलपुरी व कटकी बेडशीट।' },
        or: { title: 'ଖାଣ୍ଟି ସୁତା ସମ୍ବଲପୁରୀ ଓ କଟକୀ ଲୁଙ୍ଗି, ଗାମୁଛା, ଶାଲ୍ ଓ ବେଡସିଟ୍', price: 'ପ୍ରିଣ୍ଟ୍ ଓ ହସ୍ତତନ୍ତ ରେଞ୍ଜ୍ ଉପଲବ୍ଧ', tag: '୧୦୦% ଖାଣ୍ଟି ସୁତା • ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟେଡ୍', occasion: 'ଦୈନନ୍ଦିନ ବ୍ୟବହାର ଓ ଉପହାର', fabric: '୧୦୦% ଖାଣ୍ଟି ସୁତା ହସ୍ତତନ୍ତ ଓ ପ୍ରିଣ୍ଟେଡ୍ ଲୁଙ୍ଗି, ପାରମ୍ପରିକ ଓଡ଼ିଆ ଗାମୁଛା/ଟାୱେଲ୍, ଶାଲ୍ ଏବଂ ସମ୍ବଲପୁରୀ ଓ କଟକୀ ବେଡସିଟ୍।' }
      },
      {
        id: 'mens-sports',
        category: 'mens',
        image: 'assets/images/mens-sports-wear.jpg',
        palette: ['#1E293B', '#3F3F46', '#4D5D3B'],
        en: { title: "Men's Sports T-shirt & Pants", price: 'All Sizes In-Store', tag: 'Travel & Active Comfort • Both Stores', occasion: 'Beach Walks & Daily Travel', fabric: 'Quick-dry, breathable athletic T-shirts and stretchable track & casual pants designed for beach walks, morning jogs, and comfortable train or road travel.' },
        hi: { title: 'पुरुषों के स्पोर्ट्स टी-शर्ट व पैंट', price: 'सभी साइज़ उपलब्ध', tag: 'ट्रैवल व आरामदायक वियर • दोनों स्टोर', occasion: 'बीच वॉक व रोज़मर्रा की यात्रा', fabric: 'पुरी बीच वॉक और यात्रा के दौरान आरामदायक रहने वाले हल्के स्पोर्ट्स टी-शर्ट और स्ट्रेचेबल ट्रैक/कैज़ुअल पैंट।' },
        or: { title: 'ପୁରୁଷଙ୍କ ସ୍ପୋର୍ଟସ୍ ଟି-ସାର୍ଟ ଓ ପ୍ୟାଣ୍ଟ', price: 'ସବୁ ସାଇଜ୍ ଉପଲବ୍ଧ', tag: 'ଯାତ୍ରା ଓ ଆରାମଦାୟକ ପୋଷାକ • ଉଭୟ ଦୋକାନ', occasion: 'ସମୁଦ୍ର କୂଳ ଓ ଯାତ୍ରା', fabric: 'ସମୁଦ୍ର କୂଳ ଭ୍ରମଣ ଏବଂ ଯାତ୍ରା ପାଇଁ ହାଲୁକା ଓ ଆରାମଦାୟକ ସ୍ପୋର୍ଟସ୍ ଟି-ସାର୍ଟ ଏବଂ ଟ୍ରାକ୍ ପ୍ୟାଣ୍ଟ।' }
      },
      {
        id: 'inner-items',
        category: 'essentials',
        noPhoto: true,
        palette: ['#182235', '#C59B48'],
        en: { title: 'Inner Items & Daily Essentials', price: 'Complete Size Range In-Store', tag: 'In-Store Essential Range • Both Stores', occasion: 'Everyday Travel Necessities', fabric: 'Soft, breathable pure cotton vests, briefs, slips, and everyday innerwear essentials for men and women stocked across all standard sizes at both stores.' },
        hi: { title: 'इनर आइटम व दैनिक आवश्यकताएँ', price: 'सभी स्टैंडर्ड साइज़ उपलब्ध', tag: 'दोनों स्टोर में उपलब्ध आवश्यक रेंज', occasion: 'दैनिक व यात्रा की ज़रूरतें', fabric: 'पुरुषों और महिलाओं के लिए मुलायम सूती बनियान, ब्रीफ और दैनिक इनरवियर की पूरी रेंज दोनों स्टोर में उपलब्ध है।' },
        or: { title: 'ଇନର୍ ଆଇଟମ୍ ଓ ଦୈନନ୍ଦିନ ବସ୍ତ୍ର', price: 'ସବୁ ସାଇଜ୍ ଉପଲବ୍ଧ', tag: 'ଦୁଇଟି ଦୋକାନରେ ଉପଲବ୍ଧ', occasion: 'ଦୈନନ୍ଦିନ ଆବଶ୍ୟକତା', fabric: 'ଉଭୟ ଦୋକାନରେ ପୁରୁଷ ଓ ମହିଳାଙ୍କ ପାଇଁ ଆରାମଦାୟକ କଟନ୍ ଇନର୍ ଆଇଟମ୍ ଓ ଦୈନନ୍ଦିନ ବସ୍ତ୍ର সবୁ ସାଇଜ୍‌ରେ ଉପଲବ୍ଧ।' }
      },
      {
        id: 'many-more',
        category: 'essentials',
        noPhoto: true,
        palette: ['#B83B2A', '#C59B48'],
        en: { title: 'And Many More Varieties In-Store', price: 'Seasonal & Custom Family Bundles', tag: 'Seasonal Arrivals & Custom Requests', occasion: 'Ask Us Directly', fabric: 'Handloom dupattas, stoles, festival gift sets, kids ethnic wear, and bulk marriage/pilgrimage family packs—send us an inquiry below for any specific requirement.' },
        hi: { title: 'और भी बहुत सारी वैरायटी उपलब्ध', price: 'सीज़नल व फैमिली पैक', tag: 'सीज़नल व कस्टम अनुरोध', occasion: 'सीधे पूछताछ करें', fabric: 'हैंडलूम दुपट्टा, स्टोल, त्योहार उपहार सेट और पारिवारिक शादी/यात्रा पैक—किसी भी खास आवश्यकता के लिए नीचे संदेश लिखें।' },
        or: { title: 'ଏବଂ ଆହୁରି ଅନେକ ଭେରାଇଟି', price: 'ପାର୍ବଣ ଓ ଫ୍ୟାମିଲି ପ୍ୟାକ୍', tag: 'ଋତୁକାଳୀନ ନୂଆ ସମ୍ଭାର', occasion: 'ସିଧା ପଚାରନ୍ତୁ', fabric: 'ହସ୍ତତନ୍ତ ଓଢ଼ଣୀ, ଷ୍ଟୋଲ୍, ପାର୍ବଣ ଉପହାର ସେଟ୍ ଏବଂ ବିବାହ/ପରିବାର ପ୍ୟାକ୍—ଯେକୌଣସି ଆବଶ୍ୟକତା ପାଇଁ ତଳେ ମେସେଜ୍ କରନ୍ତୁ।' }
      }
    ];

    window.AppData.WEAVE_GUIDE = {
      sambalpuri: {
        image: 'assets/images/sambalpuri-saree.jpg',
        en: {
          title: 'Sambalpuri Handloom',
          origin: 'Western Odisha (Bargarh & Sambalpur)',
          points: [
            'Famous for crisp geometric Bandha (ikat) motifs like Pasapalli checks, Shankha (conch), and Chakra.',
            'Warp and weft threads are tie-dyed before weaving so the pattern appears identically on both sides.',
            'Available in BOTH Everyday Print (Sarees from ₹400) and 100% Pure Cotton Woven Handloom (Sarees from ₹900), plus Kurtis (₹300+) and Men’s Half Shirts (₹300+).'
          ]
        },
        hi: {
          title: 'संबलपुरी हैंडलूम',
          origin: 'पश्चिमी ओडिशा (बरगढ़ व संबलपुर)',
          points: [
            'पसापल्ली चेक, शंख और चक्र जैसे पारंपरिक ज्यामितीय इकत डिज़ाइन के लिए प्रसिद्ध।',
            'बुनाई से पहले धागों को बाँधकर रंगा जाता है जिससे दोनों तरफ एक जैसा पैटर्न उभरता है।',
            'हमारे यहाँ साड़ी, कुर्ती, कपड़ा, पुरुषों की हाफ शर्ट, लुंगी और बेडशीट में उपलब्ध।'
          ]
        },
        or: {
          title: 'ସମ୍ବଲପୁରୀ ହସ୍ତତନ୍ତ',
          origin: 'ପଶ୍ଚିମ ଓଡ଼ିଶା (ବରଗଡ଼ ଓ ସମ୍ବଲପୁର)',
          points: [
            'ପାଶାପାଲି ଚେକ୍, ଶଙ୍ଖ ଏବଂ ଚକ୍ର ପରି ସୁନ୍ଦର ବାନ୍ଧ କଳା ପାଇଁ ବିଶ୍ୱପ୍ରସିଦ୍ଧ।',
            'ବୁଣିବା ପୂର୍ବରୁ ସୂତାକୁ ବାନ୍ଧି ରଙ୍ଗ କରାଯାଏ, ଯାହା ଫଳରେ ଉଭୟ ପାର୍ଶ୍ୱରେ ସମାନ ଡିଜାଇନ୍ ଦେଖାଯାଏ।',
            'ଶାଢ଼ୀ, କୁର୍ଟି, କପଡ଼ା, ପୁରୁଷଙ୍କ ହାଫ୍ ସାର୍ଟ, ଲୁଙ୍ଗି ଏବଂ ବେଡସିଟ୍‌ରେ ଉପଲବ୍ଧ।'
          ]
        }
      },
      katki: {
        image: 'assets/images/katki-saree.jpg',
        en: {
          title: 'Odisha Katki Handloom',
          origin: 'Cuttack Region (Nuapatna & Maniabandha)',
          points: [
            'Celebrated for delicate temple-spire borders, floral creepers, and lustrous silk-cotton drapes.',
            'Light, smooth texture ideal for humid coastal evenings, temple darshan, and festive gifting.',
            'Available in BOTH Everyday Print (Sarees from ₹400) and 100% Pure Cotton Handloom (Sarees from ₹900), plus Kurtis (₹300+), Half Shirts (₹300+), Shawls, and Bedsheets.'
          ]
        },
        hi: {
          title: 'ओडिशा कटकी हैंडलूम',
          origin: 'कटक क्षेत्र (नुआपटना व मणिबंध)',
          points: [
            'बारीक मंदिर बॉर्डर, फूलों की बेल और मुलायम सिल्क-कॉटन बुनाई के लिए जाना जाता है।',
            'हल्का और आरामदायक कपड़ा, जो पुरी के मौसम और त्योहारों के लिए एकदम सही है।',
            'कटकी साड़ी, कुर्ती, कपड़ा, पुरुषों की हाफ शर्ट, शॉल और बेडशीट में उपलब्ध।'
          ]
        },
        or: {
          title: 'ଓଡ଼ିଶା କଟକୀ ହସ୍ତତନ୍ତ',
          origin: 'କଟକ ଅଞ୍ଚଳ (ନୂଆପାଟଣା ଓ ମଣିଆବନ୍ଧ)',
          points: [
            'ସୂକ୍ଷ୍ମ ଦେଉଳ ବର୍ଡର, ଫୁଲ ଡିଜାଇନ୍ ଏବଂ କୋମଳ ସିଲ୍କ-କଟନ୍ ବୁଣା ପାଇଁ ପ୍ରସିଦ୍ଧ।',
            'ହାଲୁକା ଓ ଆରାମଦାୟକ କପଡ଼ା, ଯାହା ପୁରୀ ପାଣିପାଗ ଏବଂ ଉତ୍ସବ ପାଇଁ ଉପଯୁକ୍ତ।',
            'କଟକୀ ଶାଢ଼ୀ, କୁର୍ଟି, କପଡ଼ା, ପୁରୁଷଙ୍କ ହାଫ୍ ସାର୍ଟ, ଶାଲ୍ ଏବଂ ବେଡସିଟ୍‌ରେ ଉପଲବ୍ଧ।'
          ]
        }
      }
    };
