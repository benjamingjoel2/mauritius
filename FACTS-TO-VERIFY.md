# Facts to verify

Every factual claim on the site that should be checked by someone with local knowledge before launch. Tick each item when it's confirmed or corrected. Each one lists the file it lives in, so you can edit the copy there.

Claims were written from general knowledge, not from a single checked source. Weather figures in particular are rough and should be checked against Mauritius Meteorological Services long-term averages.

## Brand and placeholders (`site.config.js`, `src/content/stays.js`)

- [ ] Contact email, phone, WhatsApp, address and hours are **placeholders** (`hello@example.com`, `+230 5000 0000`). Replace them.
- [ ] `siteUrl` matches the real production domain.
- [ ] All six stays are **invented placeholders** (marked "[Placeholder]" on the site). Replace with real partners before taking bookings.
- [ ] Brand name story: Kreol Morisien is the language most Mauritians share at home and in the street.
- [ ] Enquiry form budget bands are in euros. Confirm the currency you want to quote in.
- [ ] Enquiry page promises a reply "within two working days". Confirm you can meet that.

## Weather, wind and the coast chooser (`src/content/months.js`, `src/pages/when.js`, `src/pages/home.js`, journal post "Why June isn't low season")

- [ ] South-east trade winds blow most of the year and are strongest roughly June to August.
- [ ] In winter the east and south coasts are breezier and choppier; the west and north are calmer.
- [ ] The west coast is in a rain shadow and is the driest, sunniest coast in winter.
- [ ] In summer (roughly December to March) winds are lighter and the east coast is the most comfortable because of its breeze.
- [ ] Best-coast pick and the per-coast calm/fine/breezy rating for each of the 12 months.
- [ ] Monthly coastal air temperatures (about 24°C in July/August to about 30°C in January/February).
- [ ] Monthly sea temperatures (about 22 to 23°C in August to about 27 to 28°C in February/March).
- [ ] Monthly rain descriptions (wettest January to March; driest around September to October).
- [ ] Central plateau is "several degrees cooler" and much wetter than the coast.
- [ ] Official cyclone season dates (the site says it starts in November and runs into May; Mauritius Meteorological Services uses roughly 1 November to 15 May). Months flagged as cyclone season: November to April.
- [ ] Cyclone risk is highest roughly January to March.
- [ ] Kitesurfing seasons: best roughly May/June to September/October; lighter and less reliable in summer.
- [ ] Kite spots named: Le Morne (Kite Lagoon for learners, One Eye for experts only), Belle Mare (east), Anse la Raie (north), Mourouk and Graviers (Rodrigues).
- [ ] Le Morne gets wind in winter because the trade winds wrap around the peninsula, even though the rest of the west coast is calm.
- [ ] Calm-water beach picks per coast: Flic en Flac, Tamarin, Wolmar (west); Trou aux Biches, Mont Choisy, Pereybere (north); Belle Mare, Trou d'Eau Douce, Île aux Cerfs (east); Blue Bay, Pointe d'Esny (south).
- [ ] Humpback whales pass the west coast roughly July to October.
- [ ] Sweet spots: April to May and September to November.
- [ ] The schematic map's coastline (`src/templates/map.js`) is a rough trace through town coordinates and is labelled "not to scale". Check that the coast boundaries (which towns count as north/east/south/west) match how you describe them.

## Festivals and public days (`src/content/months.js`)

- [ ] 1 February: Abolition of Slavery Day (public holiday).
- [ ] 12 March: National Day (Independence and Republic Day).
- [ ] 2 November: Arrival of Indentured Labourers Day.
- [ ] Chinese Spring Festival and Thaipoosam Cavadee fall in January or February.
- [ ] Maha Shivaratri falls in February or March and brings pilgrims to Grand Bassin; "hundreds of thousands" of people walk there (`regions.js`, central plateau).
- [ ] Ganesh Chaturthi falls in August or September.
- [ ] Père Laval pilgrimage to Sainte-Croix, Port Louis, around 9 September.
- [ ] Diwali usually falls in October or November.
- [ ] Christmas/New Year is the busiest and most expensive period.

## Regions (`src/content/regions.js`)

### North
- [ ] Red-roofed chapel at Cap Malheureux is Notre-Dame Auxiliatrice and faces Coin de Mire.
- [ ] Cap Malheureux is the island's northern tip.
- [ ] Northern islets: Coin de Mire, Île Plate, Île Ronde; boat trips leave from Grand Baie; most northern dive sites are around them.
- [ ] Pereybere and La Cuvette are small public beaches with shallow water.
- [ ] Sir Seewoosagur Ramgoolam Botanic Garden, Pamplemousses: giant water lilies, palms.

### East
- [ ] Trou d'Eau Douce is a fishing village and the departure point for Île aux Cerfs and the Grand River South East waterfall.
- [ ] Belle Mare and Palmar have some of the longest public beaches.
- [ ] Lion Mountain is above Vieux Grand Port with views over the Mahébourg lagoon; it is short, steep, with a narrow ridge.
- [ ] Flacq market in Centre de Flacq is one of the biggest open-air markets; market days (the things-to-do page says "twice a week").

### South
- [ ] Reef breaks between Souillac and Gris Gris; swimming at Gris Gris is dangerous.
- [ ] Mahébourg has a Monday market on the waterfront.
- [ ] National History Museum is in Mahébourg, in an old colonial house.
- [ ] Blue Bay Marine Park: protected lagoon, coral close to shore, glass-bottom boats.
- [ ] Bel Ombre: former sugar estate with a restored château, nature reserve trails.
- [ ] Bois Chéri tea estate is in the south (near Grand Bois).

### West
- [ ] Le Morne Brabant is a UNESCO World Heritage Site (Le Morne Cultural Landscape, inscribed 2008) linked to maroons who escaped slavery.
- [ ] The upper section of the Le Morne hike requires a licensed guide (`things.js` too).
- [ ] Tamarin bay surf; dolphin boat trips from Tamarin/Black River.
- [ ] Chamarel: Seven Coloured Earth, Chamarel waterfall and a rum distillery within a few kilometres.
- [ ] Flic en Flac: long public beach, easy diving off the reef, busy with families at weekends.

### Central plateau
- [ ] Black River Gorges National Park protects most of the remaining native forest; trails from Petrin and Plaine Champagne.
- [ ] Grand Bassin (Ganga Talao) is a crater lake with temples and a giant Shiva statue.
- [ ] Trou aux Cerfs is a dormant volcanic crater in Curepipe with a road around the rim.
- [ ] Driest period on the plateau: September to November.
- [ ] Photo note: Cascade 500 Pieds is in Black River Gorges National Park, on the south-western edge of the plateau.

### Rodrigues
- [ ] Rodrigues is an autonomous outer island of the Republic of Mauritius, roughly 560 km east.
- [ ] Flight from Mauritius takes about 90 minutes; only a few flights a day.
- [ ] A ferry runs some weeks.
- [ ] The lagoon is larger than the island itself.
- [ ] Island can be crossed in under an hour.
- [ ] Most residents are Creole.
- [ ] Coastal walk Graviers to Saint François / Trou d'Argent.
- [ ] François Leguat Reserve: giant tortoises and limestone caves.
- [ ] Port Mathurin market is on Saturday mornings, starting very early.
- [ ] Île aux Cocos is a bird reserve with controlled visits; Île aux Sables also reachable by boat.
- [ ] Rodriguan specialities: dried octopus, octopus curry, honey, lime pickles, chilli pastes, tourte (coconut or papaya pastry).

## Things to do (`src/content/things.js`)

- [ ] Le Pouce: in the Moka range above Port Louis; "moderate" difficulty; views of Port Louis and Pieter Both.
- [ ] Black River Peak is the highest point in Mauritius, reached from the Plaine Champagne road.
- [ ] Tamarind Falls (7 Cascades) near Henrietta; going with a guide recommended.
- [ ] Difficulty grades given for every hike.
- [ ] A reef "almost surrounds" the island.
- [ ] Trou aux Biches and Mont Choisy are calmest in winter.
- [ ] Rodrigues lagoon boat trips to Île aux Cocos and Île aux Sables.
- [ ] Diving runs all year; clearest water often in the drier months.
- [ ] Flic en Flac dive sites include "the Cathedral" rock arches.
- [ ] Blue Bay offers shallow beginner dives.
- [ ] 24 hours between last dive and flying (check against current DAN/PADI guidance).
- [ ] Saint Aubin: estate house, gardens, vanilla plantation, rum distillery, in Rivière des Anguilles.
- [ ] Rhumerie de Chamarel makes agricultural rum from fresh cane juice.
- [ ] Château de Labourdonnais in Mapou: restored 19th-century house, orchards, distillery.
- [ ] Bois Chéri: factory tour, museum, tasting room.
- [ ] Sugar shaped the island's economy for about three centuries; tea came later.
- [ ] Port Louis Central Market opening days ("daily except some holidays").
- [ ] Mahébourg market is on Mondays.

## Food (`src/content/food.js`, `src/pages/food.js`, journal post "How to eat your way through a day in Port Louis")

- [ ] Dholl puri: description; descends from dal puri brought by indentured labourers from present-day Bihar and Uttar Pradesh in the 19th century; served with cari gros pois, rougaille, chutney, achard; stalls sell out by early afternoon; popular in Port Louis and Rose-Hill.
- [ ] Rougaille has Creole and French roots.
- [ ] Farata: from Indian paratha; description; served with curries and rougaille.
- [ ] Mine frit: Chinese roots, many settlers Hakka-speaking, from the 19th century, ran village shops; "mine" is Kreol for noodles.
- [ ] Gateau piment: split-pea chilli fritter; cousin of Indian vada; often eaten in a baguette or pain maison; bread as a French legacy.
- [ ] Alouda: description (milk, basil seeds/tookmaria, agar jelly, vanilla or almond); from falooda, which has Persian roots; Port Louis Central Market is famous for it.
- [ ] Pronunciation guides for all five dishes.
- [ ] Kreol phrase "enn ti pe" means "a little".
- [ ] Dholl puri, farata with bean curry, gateau piment and alouda are often meat-free.
- [ ] Cooking-tradition summaries (Indian, Creole, Chinese, French), including boulettes, mine bouille and daube.
- [ ] "Most Mauritians have family roots in India."
- [ ] The cuisines have been mixing "for nearly two centuries."
- [ ] Metro Express runs to Port Louis from Rose-Hill and Curepipe.
- [ ] Royal Street separates the market area from Chinatown; Le Caudan waterfront is a short walk away.
- [ ] Many stalls close early on Sundays and public holidays.

## Practical and safety advice

- [ ] Blue Bay: feeding fish is discouraged.
- [ ] Dolphin and whale trips: a national code of conduct exists for operators.
- [ ] Grand Bassin dress code: dress modestly and remove shoes where asked.
- [ ] Mauritius time is UTC+4 (`site.config.js`, contact hours).

## Photos (`src/content/photos.js`)

All 21 photos were accepted only after checking the location recorded on Unsplash through the Unsplash API on 2026-10-21. Notes:

- [ ] `L6hI8SK9Hr0` and `NeweseMfeeg` are recorded as "Graviers, Rodrigues" but have no GPS coordinates. The location name matches; confirm if you want coordinate-level certainty.
- [ ] `v6dBUEPJD4s` (Le Morne public beach) shows a man fishing from the beach. It's used on the When to Go page with the caption "Fishing from the beach at Le Morne."
