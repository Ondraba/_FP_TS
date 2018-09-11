import {TechnologyInput} from '../../shared/graphql';
import {TechnologyModel} from '../database/schema';

/*
const fake = [
    {
        id: '1',
        name: 'React',
        imageSrc: `${SettingsService.getURLImages()}/technologies/react.png`,
        description: `Jsme odborníci v tvorbě React aplikací. V současné době se jedná o jednu z klíčových technologíí pro tvorbu webu.
                    Ve spojení s Reduxem a GraphQL je možné vytvořit efektivní a uživatelsky sofistikovanou aplikaci.
                    V případě, že byste se rádi adaptovali na React, jsme schopni pro Vás zajistit také školení. Ať už formou prezentace či workshopů.
                    Školitelé jsou odborníci, kteří Vám tuto technologii představí na reálných projektech.
                    `,
    },

    {
        id: '2',
        name: 'Java',
        imageSrc: `${SettingsService.getURLImages()}/technologies/java.png`,
        description: `
                    Většina našich vývojářů jsou původně java developery. Pokud máte požadavky na tvorbu Java backend systémů, jsme schopni Vám pomoci.
                    Zkušenosti máme jak z bankovnictví, tak průmyslu či telefonie.
                    Javu dnes vnímáme jako dobrou alternativu pro složitější backend systémy. Ve spojení se Springem a JPA, je možné backend napsat v Jave
                    a frontend pomocí Reactu.
                    `,
    },

    {
        id: '3',
        name: 'Google Cloud',
        imageSrc: `${SettingsService.getURLImages()}/technologies/google-cloud.png`,
        description: `
                Cloud je dnes stále častěji využíván jakožto hlavní prostředek na provozování aplikací.
                Na trhu existuje několik variant. Za relevantní považujeme AWS, Azure či Google Cloud.
                Největší zkušenosti máme s Google Cloud, který pomocí App Engine systému umožňuje deklarativní konfiguraci serverů a tím pádem zajistit
                jednoduché nasazení, správu logů či monitoring. V produkci se poté jednoduše můžeme bavit o tom, jak horizontálně škálovat aplikace.
                Pokud Vás Google Cloud zajímá více, přiďte na naše školení, kde Vám v praktických ukázkách předvedeme, jak nasazovat a provozovat
                aplikace v Cloudu.
                `,
    },

    {
        id: '4',
        name: 'GraphQL',
        imageSrc: `${SettingsService.getURLImages()}/technologies/graphql.png`,
        description: `
                    V posledních letech se čím dál, tím častěji objevují požadavky na tvorbu OpenAPI.
                    V praxi to znamená, že společnosti hledají způsob, jak vystavit své API, které bude použitelné jak pro vlastní aplikace,
                    typu web či mobil, ale také pro aplikace třetích stran.
                    Pro tyto účely zde existuje GraphQL, které umožňuje se dotazovat na ty data, která systém potřebuje.
                    GrapQL nejen, že snižuje síťový traffic, ale také pomáhá při definování toho, co jednotlivé API poskytuje.
                    V případě, že Vás GraphQL zajímá více, přijďte na naše školení, kde si v praktických ukázkách předvedeme, jak GraphQL používat v reálných
                    projektech.
                    `,
    },

    {
        id: '5',
        name: 'Redux',
        imageSrc: `${SettingsService.getURLImages()}/technologies/redux.png`,
        description: `
                    V případě, že tvoříte webové aplikace, často se dostanete do stavu, kdy řešíte, jak správně danou aplikaci udržovat z pohledu jejího stavu.
                    I když je Redux technologíí, která je hodně spjata s Reactem, jedná se o řešení, které lze využít i v jiných frameworcích.
                    Viz například Angular.
                    Pokud Vás Redux zajímá více, přijďte na naše školení, kde si v praktických ukázkách předvedeme, jak správně navrhovat Redux store a
                    jak Redux používat na reálných projektech.
                    `,
    },

    {
        id: '13',
        name: 'Spring',
        imageSrc: `${SettingsService.getURLImages()}/technologies/spring-framework.png`,
        description: `
                    Spring Framework je neodmyslitelně spjat s J2EE. Jinými slovy jedná se o technologii, která Vám zprostředkovává ekosystém na tvorbu
                    Java backend systémů. Se Springem máme dlouholeté zkušenosti a v případě tvorvy Java backend systémů se jedná o jednu z hlavních
                    technologií, které používáme. Díky projektům jako je Spring Boot je dnes tvorba a nasazování Spring aplikací velice snadnou záležitostí.`,
    },

    {
        id: '10',
        name: 'Android',
        imageSrc: `${SettingsService.getURLImages()}/technologies/android.png`,
        description: `
                    Díky dnešním technologiím je možné jednoduše napsat nativní mobilní aplikaci. K tomuto účelu používáme dvě cesty.
                    První cestou je React Native, který nám umožňuje napsat mobilní aplikaci tak, že je ve výsledku nativní a tím pádem klade důraz
                    na rychlost. Ve spojení s Code Push je navíc možné takovou aplikaci za běhu aktualizovat a tím minimalizovat nutnost opakované
                    aktualizace z Google Play či Apple Store.
                    Druhou cestou je PWA. Progressive Web Application je nová technologie, která poskytuje možnost napsat aplikaci jako webovou stránku
                    a tu poté považovat za nativní aplikaci. Nejedná se o hybridní aplikace, které se používaly v předchozích letech, ale o variantu,
                    která Vám nabízí rychlost, efektivnost a snížení nákladů na vývoj.
                    Pokud Vás React Native či PWA zajímá více, přijďte na naše školení, kde si ukážeme, jak se dnes dají psát mobilní aplikace.
                    `,
    },

    {
        id: '6',
        name: 'Node.js',
        imageSrc: `${SettingsService.getURLImages()}/technologies/nodejs.png`,
        description: `
                    V posledních letech se javascript stal jazykem číslo jedna. Ať se bavíme o webu, serveru či desktop aplikací.
                    Node.js nám poskytuje běhové prostředí, které využíváme k tvorbě takovýchto aplikací.
                    Node.js není výstřelek poslední doby. Jedná se o stabilní prostředí, které používají v produkci takové firmy jako je:
                    Microsoft, LinkedIn, IBM či Facebook.
                    Pokud Vás Node.js zajímá více, přijďte na naše školení, kde v praktických ukázkách uvidíte, jak s Node.js pracovat a to i v produkčním
                    prostředí.
                    `,
    },

    {
        id: '17',
        name: 'Typescript',
        imageSrc: `${SettingsService.getURLImages()}/technologies/typescript.png`,

        description: `
                    Abychom byli schopni napsat robusní a udržitelný systém v javascriptu, používáme ke své práci Typescript.
                    Jedná se o jazyk, který nám do javascriptu přidává typovou kontrolu a tím zajišťuje větší kontrolu nad kódem, který píšeme.
                    Pokud Vás Typescript zajímá více, přijďte na naše školení, kde si v praktických ukázkách předvedeme, jak Typescript používat.
                    `,
    },

    {
        id: '24',
        name: 'Next.js',
        imageSrc: `${SettingsService.getURLImages()}/technologies/nextjs.png`,

        description: `
                    V poslední době se hodně začalo mluvit o tom, že javascriptové webové frameworky přináší nevýhodu z pohledu SEO optimalizací.
                    V případě použití server side renderingu tomu tak není. Díky spojení React + Next.js jsme schopni napsat aplikaci tak, aby
                    ve výsledku podporovala nejen SEO, ale také aby byla dostatečně rychlá a směrem ke klientovi se načítala pouze ta data, které
                    skutečně potřebuje.
                    Pokud Vás Next.js a problematika Server Side Renderingu zajímá více, přijďe na naše školení, kde si v praktických ukázkách předvedeme,
                    jak použít Next.js a jak ho provozovat v produkčním prostředí.
                    `,
    },

    {
        id: '7',
        name: 'HTML',
        imageSrc: `${SettingsService.getURLImages()}/technologies/html.png`,

        description: `
                Pokud se dnes bavíme o moderním pojetí webu, neodmyslitelně k tomuto účelu patří i nové specifikace HTML.
                Na našich projektech se snažíme využít tyto technologie tak, abychom byli schopni využít novou specifikaci, ale abychom
                zároveň příliš nelimitovali uživatele, kteří používají starší webové prohlížeče.
                `,
    },

    {
        id: '8',
        name: 'Javascript',
        imageSrc: `${SettingsService.getURLImages()}/technologies/javascript.png`,
        description: `
                Ke každému webu dnes patří javascript. Jelikož je náš hlavní jazyk právě javascript, myslíme samozřejmě i na to, abychom v případě
                webu docílili co největší optimalizace tohoto jazyka. Ať už se jedná o minimalizaci javascriptových souborů, či využití vlastností,
                které nabízí moderní prohlížeče.
                `,
    },

    {
        id: '9',
        name: 'CSS',
        imageSrc: `${SettingsService.getURLImages()}/technologies/css.png`,
        description: `
                    Webové stránky a aplikace by bez použití CSS nebylo dnes možné provozovat.
                    V našich React aplikací používáme CSS v javascriptu. Toto řešení nám sebou přináší několik výhod, mezi které patří například to,
                    že jsme schopni do CSS vkládat barevné konstanty či ho definovat za běhu.
                    Pokud vás téma CSS v javascriptu zajímá více, přijďe na naše školení, kde si ukážeme jak v takovém režimu pracovat.
                    `,
    },

    {
        id: '11',
        name: 'Apple',
        imageSrc: `${SettingsService.getURLImages()}/technologies/apple.png`,
        description: `
                    Díky dnešním technologiím je možné jednoduše napsat nativní mobilní aplikaci.
                    K tomuto účelu používáme React Native, který nám umožňuje napsat mobilní aplikaci tak, že je ve výsledku nativní a tím pádem klade důraz
                    na rychlost. Ve spojení s Code Push je navíc možné takovou aplikaci za běhu aktualizovat a tím minimalizovat nutnost opakované
                    aktualizace z Google Play či Apple Store.
                    Dále nám tato technologie umožňuje sdílet větší část kódu mezi Android verí a iOS.
                    Pokud Vás React Native zajímá více, přijďte na naše školení, kde si ukážeme, jak se dnes dají psát mobilní aplikace.
                    `,
    },

    {
        id: '14',
        name: 'Hibernate',
        imageSrc: `${SettingsService.getURLImages()}/technologies/hibernate.png`,

        description: `
                    Téměř v každém Java backend systému se musí pracovat s databází. K tomuto účelu zde existuje specifikace JPA, která definuje,
                    jak pracovat v Jave s persistentní vrstvou. Jelikož máme dlouholeté zkušenosti s tvorbou persistentní vrstvy v JPA, pokužíváme
                    implmentaci přes Hibernate.
                    `,
    },

    {
        id: '16',
        name: 'Git',
        imageSrc: `${SettingsService.getURLImages()}/technologies/git.png`,
        description: `
                    Verzovací systém se dnes rovná Git. Verzování je základním kamenem vývoje softwaru.
                    Ať už se jedná o nutnost práce v týmu, kontrolu kódu na základě změn či rozdělení projektu do několika fází (vývoj, testy, produkce).
                    `,
    },

    {
        id: '18',
        name: 'Idea',
        imageSrc: `${SettingsService.getURLImages()}/technologies/idea.png`,
        description: `
                    V dnešní době existuje nepřeberné množství editorů kódu. Většina z nás používá IntelliJ IDEu, což je komplexní IDE, které podporuje
                    širokou škálu různých technologií. Ať už se jedná o Javascript, Javu, SQL či podporu pro Node.js a Java aplikační servery.
                    `,
    },

    {
        id: '12',
        name: 'Jira',
        imageSrc: `${SettingsService.getURLImages()}/technologies/jira.png`,
        description: `
                    Vývoj softwaru je projekt. A pokud má být takový projekt úspešný, je třeba ho něčím řídít. K tomuto účelu nejčastěji používáme Jiru.
                    Ať pro vývoj pomocí metodiky SCRUM či jako podpůrný nástroj na evidenci a kontrolu požadavků, které na projekt vznikají.
                    Pokud máme být schopni určit, v jakém stavu se projekt nachází, musíme k tomu použít nástroj, který nám to jednoduše umožní.
                    `,
    },

    {
        id: '15',
        name: 'Bitbucket',
        imageSrc: `${SettingsService.getURLImages()}/technologies/bitbucket.png`,
        description: `
                    Abychom byli schopni efektivně používat Git a vše, co je s verzováním softwaru spojeno, potřebujeme nástroj, který nám naší práci
                    usnadní. Bitbucket je komplexní řešení, které pomocí webových služeb, přístupňuje Git repozitáře. Současně s tím, používáme
                    i integrace, jako je Slack, CircleCI, apod.
                    `,
    },

    {
        id: '19',
        name: 'Confluence',
        imageSrc: `${SettingsService.getURLImages()}/technologies/confluence.png`,
        description: `
                    Znalostní databáze je nedílnou součástí každého správného projektu. Ať už se jedná o systémovou analýzu nebo návody na jakékoli téma,
                    používáme k tomuto účelu Confluence. V případě spojení Confluence + Jira, získáváme kompletní nástroj na řízení a správu projektů.
                    `,
    },

    {
        id: '20',
        name: 'CircleCI',
        imageSrc: `${SettingsService.getURLImages()}/technologies/circleci.png`,
        description: `
                    To, co mohou dělat počítače, nechme dělat počíteče. Přesně tímto heslem by se dal popsat CircleCI.
                    Tento nástroj nám umožňuje jednoduše nastavit a spravovat Continuous integration. Ať už se jedná o automatické spouštění testů,
                    či automatické nasazování aplikací do Cloudu.
                    `,
    },

    {
        id: '21',
        name: 'Docker',
        imageSrc: `${SettingsService.getURLImages()}/technologies/docker.png`,
        description: `
                    V dnešní době je Docker stále častěji využívaná technologie. V případě, že pracujeme na komplexnějších projektech,
                    často se dostáváme do stavu, kdy nastavení lokálního prostředí je příliš náročná práce. Proto zde máme Docker.
                    Umožňuje nám izolovaně spustit projekt tak, jak bude spuštěn i v produkci. Nejenom, že tím minimaluzujeme počet chyb,
                    ale také nutnost, nastavovat si lokální prostředí.
                    `,
    },

    {
        id: '22',
        name: 'Jenkins',
        imageSrc: `${SettingsService.getURLImages()}/technologies/jenkins.png`,
        description: `
                    Pokud dnes někdo mluví o Continuous Integration, často tím automaticky míni Jenkins. Jedná se o komplexní nástroj, který umožňuje
                    sofistikovaně plánovat a spravovat úlohy, které jsou důležité pro automatickou dodávku softwaru. Ať už se jedná o spouštění
                    automatických testů či nasazování aplikací do Cloudu, se vším nám Jenkins pomůže.
                    `,
    },

    {
        id: '23',
        name: 'Jest',
        imageSrc: `${SettingsService.getURLImages()}/technologies/jest.png`,
        description: `
                    Žádný softwarový projekt nemůže být označen jako "Production Ready", pokud neobsahuje testy. Pro psaní testů používáme knihovnu Jest,
                    za kterou stojí velká programátorská komunita. Při psaní samotných testů, není třeba komplikované konfigurace.
                    `,
    },

    {
        id: '25',
        name: 'Material Design',
        imageSrc: `${SettingsService.getURLImages()}/technologies/materialui.png`,
        description: `
                    Abychom byli schopni vytvořit úspěšný frontendový projekt, hledáme k tomuto účelu nástroje, které za nás část této práce splní.
                    S Material Designem je dnes možné tvořit takové projekty, které budou dobře fungovat jak v mobilních zařízení, tak i na desktopech.
                    V kombinaci s technologií Progressive Web Application je velice snadné vytvořit projekt, který bude fungujicí jako webová stránka a
                    současně jako nativní mobilní aplikace. Material Design k tomu přispívá tak, že aplikace bude uživatelům připadat povědomě a díky
                    tomu snížíme náročnost adaptace nových uživatelů.
                    `,
    },

    {
        id: '26',
        name: 'Slack',
        imageSrc: `${SettingsService.getURLImages()}/technologies/slack.png`,
        description: `
                    Abychom byli co nejefektivnější, hledali jsme komunikační kanál, kterým bychom se byli schopni rychle domlouvat.
                    Slack je platforma, která nám přesně toto umožňuje. Na jedné straně je to skvělý nástroj na komunikaci mezi uživateli,
                    na straně druhé je to platforma, která poskytuje informace o stavu projektu. Díky integracím na nástroje jako je
                    Jira, Bitbucket, CircleCI, apod, je Slack hlavním pozorovacím oknem.
                    `,
    },
];
*/

export const TechnologyService = {
    findAll: async () => await TechnologyModel.find().sort('order'),
    findById: (id: string) => TechnologyModel.findById(id),
    create: (input: TechnologyInput) => new TechnologyModel(input).save(),
    save: (id: string, input: TechnologyInput) => TechnologyModel.findByIdAndUpdate(id, input),
};
