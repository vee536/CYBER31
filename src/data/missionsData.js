import { CATEGORIES } from './categories';
export { CATEGORIES };

export const MISSIONS = [
  {
    day: 1,
    category: 'identity',
    title: 'FORTIFY ACCESS KEYS',
    topic: 'Password Strength & Passphrases',
    alertSource: 'AUTHENTICATION GATEWAY',
    threatType: 'Weak Credential Vulnerability',
    threatSeverity: 'HIGH',
    quote: 'A strong password is your first line of defense; a unique passphrase is your fortress.',
    briefing: 'Automated brute-force bots test millions of common passwords per second. Construct an unbreakable defense key that withstands modern credential cracking.',
    missionType: 'password',
    takeaway: 'Combine at least 12 characters with uppercase, lowercase, numbers, and symbols—or better yet, a 4-word random passphrase. Never reuse passwords across accounts.',
  },
  {
    day: 2,
    category: 'identity',
    title: 'THE SECOND BARRIER',
    topic: 'Two-Factor Authentication (2FA)',
    alertSource: 'IDENTITY CONTROLLER',
    threatType: 'Single-Factor Compromise',
    threatSeverity: 'CRITICAL',
    quote: 'A stolen password is only dangerous if it is the only lock on the door.',
    briefing: 'A credential leak exposed your password online. An intruder attempts to log into your account from an unknown location. You must activate secondary verification.',
    missionType: 'scenario',
    scenario: {
      question: 'Your email alerts you that someone in another country entered your correct password. Which 2FA method offers the strongest defense against automated phishing bots?',
      options: [
        {
          id: 'opt1',
          text: 'Authenticator App (TOTP) or Hardware Security Key (FIDO2)',
          isCorrect: true,
          feedback: 'Correct! App-based codes and FIDO hardware keys cannot be intercepted via SIM-swapping and provide robust multi-layered protection.',
        },
        {
          id: 'opt2',
          text: 'SMS text message code to your mobile phone number',
          isCorrect: false,
          feedback: 'SMS is better than nothing, but attackers can intercept text codes via SIM-swapping or telecom spoofing. Authenticator apps are much safer.',
        },
        {
          id: 'opt3',
          text: 'Email verification link sent to the same email provider',
          isCorrect: false,
          feedback: 'If your master email is compromised, email verification fails completely. Dedicated app tokens or physical security keys are superior.',
        }
      ]
    },
    takeaway: 'Enable 2FA (Two-Factor Authentication) on every critical account. Prefer Authenticator apps (Google/Microsoft Authenticator) over SMS codes.',
  },
  {
    day: 3,
    category: 'communication',
    title: 'INTERCEPTED DISPATCH',
    topic: 'Smishing & Mobile Text Scams',
    alertSource: 'CELLULAR SMS GATEWAY',
    threatType: 'Deceptive SMS Parcel Link',
    threatSeverity: 'HIGH',
    quote: 'Think before you tap. Urgency on a small screen is a scammer’s favorite weapon.',
    briefing: 'An incoming SMS alerts you of an "undelivered package" requiring an immediate $1.50 processing fee via a shortened link or your parcel will be destroyed. Inspect the warning signs.',
    missionType: 'smishing',
    takeaway: 'Legitimate couriers never demand payment via urgent SMS links. If you suspect an issue, visit the official carrier website directly using your tracking number.',
  },
  {
    day: 4,
    category: 'identity',
    title: 'VAULT INTEGRITY',
    topic: 'Password Managers & Storage',
    alertSource: 'LOCAL STORAGE DAEMON',
    threatType: 'Insecure Note Storage',
    threatSeverity: 'MODERATE',
    quote: 'If your memory is your password vault, your passwords are too simple.',
    briefing: 'You have over 80 digital accounts. Keeping track of complex unique credentials across all services without compromising security requires the right strategy.',
    missionType: 'scenario',
    scenario: {
      question: 'Where is the safest place to store 80+ unique, 16-character passwords across your personal and student accounts?',
      options: [
        {
          id: 'opt1',
          text: 'A reputable dedicated Password Manager with end-to-end encryption and a master passphrase',
          isCorrect: true,
          feedback: 'Spot on! Modern password managers use zero-knowledge encryption, meaning only your master passphrase can unlock your digital vault.',
        },
        {
          id: 'opt2',
          text: 'A locked note or spreadsheet in your cloud drive',
          isCorrect: false,
          feedback: 'Unencrypted notes or cloud docs can be easily synced, scraped by malware, or accessed if your cloud session stays logged in.',
        },
        {
          id: 'opt3',
          text: 'A sticky note beneath your computer keyboard',
          isCorrect: false,
          feedback: 'Physical notes leave you vulnerable to shoulder surfers, roommates, visitors, and accidental loss.',
        }
      ]
    },
    takeaway: 'Use an end-to-end encrypted password manager (e.g. Bitwarden, 1Password) so you only need to remember one strong master passphrase.',
  },
  {
    day: 5,
    category: 'communication',
    title: 'PHISHING DECEPTION',
    topic: 'Email Phishing & Sender Spoofing',
    alertSource: 'EXTERNAL MAIL SERVER',
    threatType: 'Account Suspension Phishing',
    threatSeverity: 'CRITICAL',
    quote: 'Pause. Check. Then click.',
    briefing: 'An urgent security notification arrived claiming your online payment account will be permanently terminated in 2 hours due to unauthorized activity. Inspect the message and identify the warning signs.',
    missionType: 'phishing',
    takeaway: 'Scammers weaponize fear and urgency to bypass your critical thinking. Always inspect sender domains, hover links before clicking, and never open unsolicited attachments.',
  },
  {
    day: 6,
    category: 'threats',
    title: 'SILENT INFILTRATION',
    topic: 'Malware & Disguised Attachments',
    alertSource: 'INBOX PERIMETER FILTER',
    threatType: 'Double Extension Executable',
    threatSeverity: 'CRITICAL',
    quote: 'A file is not innocent just because its icon looks friendly.',
    briefing: 'A vendor sends you an unexpected invoice attachment named "Invoice_OCT2026.pdf.exe". The email asks you to open it immediately to dispute a $940 charge.',
    missionType: 'scenario',
    scenario: {
      question: 'Why is the file "Invoice_OCT2026.pdf.exe" extremely dangerous to open or execute?',
      options: [
        {
          id: 'opt1',
          text: 'It disguises an executable program (.exe) as a PDF document using a double extension to deliver malware',
          isCorrect: true,
          feedback: 'Exact hit! Operating systems often hide known extensions, making "Invoice.pdf.exe" appear as just a PDF file while running malicious code upon clicking.',
        },
        {
          id: 'opt2',
          text: 'It is simply a compressed PDF that takes up too much RAM',
          isCorrect: false,
          feedback: 'An .exe file is an executable application, never a standard document. Running it executes raw code on your machine.',
        },
        {
          id: 'opt3',
          text: 'It will automatically forward itself to all contacts without running',
          isCorrect: false,
          feedback: 'The real danger is executing malicious trojans or infostealers directly onto your system.',
        }
      ]
    },
    takeaway: 'Never execute double-extension attachments (like .pdf.exe or .docx.vbs). Always enable "File name extensions" in your operating system folder settings.',
  },
  {
    day: 7,
    category: 'communication',
    title: 'INBOX PURGE',
    topic: 'Suspicious DMs & Social Engineering',
    alertSource: 'SOCIAL CHAT PROTOCOL',
    threatType: 'Account Hijack Impersonation',
    threatSeverity: 'HIGH',
    quote: 'Attackers don’t always hack systems. Sometimes, they manipulate people.',
    briefing: 'A close friend messages you on Instagram: "Hey! I am entering an influencer contest, can you vote for me by sending back the 6-digit code sent to your phone?"',
    missionType: 'scenario',
    scenario: {
      question: 'What is actually happening in this Instagram conversation?',
      options: [
        {
          id: 'opt1',
          text: 'Your friend’s account was compromised; the attacker is trying to reset your password and steal your account',
          isCorrect: true,
          feedback: 'Critical catch! Attackers trigger a password reset or 2FA request on your account, then trick you into relaying the SMS code to them.',
        },
        {
          id: 'opt2',
          text: 'Instagram requires dual-friend verification for seasonal community contests',
          isCorrect: false,
          feedback: 'Instagram never uses other people’s SMS codes to verify contest entries. This is a classic account takeover tactic.',
        },
        {
          id: 'opt3',
          text: 'It is harmless spam generated by automated bot accounts',
          isCorrect: false,
          feedback: 'Relaying that code would grant the attacker total control over your profile and lock you out.',
        }
      ]
    },
    takeaway: 'Never forward verification codes or SMS tokens to anyone—even friends. When a contact makes an unusual request, call them directly to verify.',
  },
  {
    day: 8,
    category: 'browsing',
    title: 'MIRROR REALITY',
    topic: 'Fake Websites & Typosquatting',
    alertSource: 'WEB SHIELD PROXY',
    threatType: 'Homograph Domain Spoofing',
    threatSeverity: 'HIGH',
    quote: 'A padlock icon means the connection is encrypted, not that the website is honest.',
    briefing: 'A search engine ad redirects you to a login portal looking identical to your bank or cloud account. The address bar displays "https://accounts-g00gle.security-auth.net". Inspect the address bar.',
    missionType: 'fake_url',
    takeaway: 'Scammers register lookalike domains with typos (typosquatting) and acquire free SSL certificates. Always look at the core domain right before the first single slash.',
  },
  {
    day: 9,
    category: 'browsing',
    title: 'CRYPTIC CONNECTION',
    topic: 'HTTPS & Transport Security',
    alertSource: 'BROWSER SECURITY GUARD',
    threatType: 'Unencrypted HTTP Credential Submission',
    threatSeverity: 'MODERATE',
    quote: 'Unencrypted data in transit is like shouting your secrets across a crowded room.',
    briefing: 'You are submitting payment card details on a student marketplace website, but the browser displays "Not Secure" (http:// instead of https://).',
    missionType: 'scenario',
    scenario: {
      question: 'What risk do you face when typing personal or payment data into an unencrypted HTTP website?',
      options: [
        {
          id: 'opt1',
          text: 'Anyone on the same local network or Wi-Fi can eavesdrop and read your password and card in plaintext',
          isCorrect: true,
          feedback: 'Exactly right. Plain HTTP sends your packets in readable text. HTTPS wraps your session in TLS encryption so interceptors only see unreadable noise.',
        },
        {
          id: 'opt2',
          text: 'The website will charge double fees for unencrypted bandwidth',
          isCorrect: false,
          feedback: 'The fee structure is irrelevant—the core risk is eavesdropping and credential theft.',
        },
        {
          id: 'opt3',
          text: 'Your computer will automatically download a rootkit virus',
          isCorrect: false,
          feedback: 'While malicious injection is possible, the primary danger is cleartext transmission of sensitive data.',
        }
      ]
    },
    takeaway: 'Never enter login credentials, addresses, or payment cards on non-HTTPS websites. Look for "https://" and valid browser security indications.',
  },
  {
    day: 10,
    category: 'browsing',
    title: 'EXTENSION INFECTION',
    topic: 'Malicious Browser Extensions',
    alertSource: 'BROWSER ADD-ON ENGINE',
    threatType: 'Excessive Web Permissions',
    threatSeverity: 'HIGH',
    quote: 'Browser extensions have full access to the digital pages you read and type.',
    briefing: 'A trendy free extension promises to "find free coupons and discount codes everywhere". Upon installation, it requests permission to "Read and change all your data on all websites you visit".',
    missionType: 'scenario',
    scenario: {
      question: 'Why should you be cautious when a coupon extension requests "Read and change all data on all websites"?',
      options: [
        {
          id: 'opt1',
          text: 'It can log your keystrokes, capture bank credentials, and hijack session cookies across every tab',
          isCorrect: true,
          feedback: 'Defensive awareness on point! Extensions with universal page access act like in-browser keyloggers and spyware.',
        },
        {
          id: 'opt2',
          text: 'It slows down your computer’s hard drive spinning speed',
          isCorrect: false,
          feedback: 'The threat is privacy exfiltration and session hijacking, not mechanical drive speed.',
        },
        {
          id: 'opt3',
          text: 'It deletes your browsing history automatically every 24 hours',
          isCorrect: false,
          feedback: 'It doesn’t delete history; it reads and monitors your personal web sessions.',
        }
      ]
    },
    takeaway: 'Audit your browser extensions regularly. Uninstall extensions you no longer use, and never grant permissions to read all websites unless strictly necessary.',
  },
  {
    day: 11,
    category: 'digital_life',
    title: 'SURVEILLANCE IN SIGHT',
    topic: 'Shoulder Surfing & Screen Privacy',
    alertSource: 'PHYSICAL SENSOR BEACON',
    threatType: 'Visual Eavesdropping in Public Transit',
    threatSeverity: 'MODERATE',
    quote: 'The simplest cyber attacks do not require a computer—just a pair of eyes.',
    briefing: 'You are seated on a crowded commute typing your banking PIN and reading sensitive personal emails. Someone sitting right behind you is leaning forward with their smartphone camera angled toward your screen.',
    missionType: 'scenario',
    scenario: {
      question: 'What is the most effective immediate defense against public shoulder surfing?',
      options: [
        {
          id: 'opt1',
          text: 'Use biometric logins (Face/Fingerprint), angle your screen away, and install a privacy screen filter',
          isCorrect: true,
          feedback: 'Spot on! Biometrics eliminate manual PIN typing, while privacy filters block viewing angles from anyone seated beside or behind you.',
        },
        {
          id: 'opt2',
          text: 'Type your PIN twice as fast so nobody can memorize the key sequence',
          isCorrect: false,
          feedback: 'Modern smartphone cameras recording at 60fps can easily capture and slow down quick typing.',
        },
        {
          id: 'opt3',
          text: 'Switch your phone to airplane mode while typing your password',
          isCorrect: false,
          feedback: 'Airplane mode disables wireless radios, but does nothing to stop visual shoulder surfing.',
        }
      ]
    },
    takeaway: 'Be aware of your physical surroundings. Shield your keypad when entering PINs in public, use biometrics, and avoid viewing confidential data in crowded spaces.',
  },
  {
    day: 12,
    category: 'digital_life',
    title: 'THE OPEN MOSAIC',
    topic: 'Social Media Oversharing',
    alertSource: 'SOCIAL INTELLIGENCE FEED',
    threatType: 'OSINT Footprint Vulnerability',
    threatSeverity: 'HIGH',
    quote: 'Every piece of information you share can become part of someone else’s puzzle.',
    briefing: 'A traveler uploads a photo holding their boarding pass at the airport gate with caption: "Off to Tokyo for 3 weeks! House is empty, catch you in November! #wanderlust #birthdayweek". Spot and tap the oversharing hazards.',
    missionType: 'oversharing',
    takeaway: 'Boarding pass barcodes contain passenger record locators, full names, and ticket data. Broadcasting empty home dates and birthdays makes you an easy target for burglary and identity theft.',
  },
  {
    day: 13,
    category: 'digital_life',
    title: 'THE UNSUBSCRIBE TRAP',
    topic: 'Spam Traps & Activity Verification',
    alertSource: 'SPAM TELEMETRY PROXY',
    threatType: 'Live Email Address Verification Beacon',
    threatSeverity: 'MODERATE',
    quote: 'Not every button does what it says. Sometimes clicking unsubscribe confirms you are listening.',
    briefing: 'You receive an unsolicited, sketchy email promoting miracle supplements or crypto investments. At the bottom is a tiny link: "Click here to unsubscribe".',
    missionType: 'scenario',
    scenario: {
      question: 'What happens when you click "Unsubscribe" inside an illegal, shady spam email?',
      options: [
        {
          id: 'opt1',
          text: 'It confirms your email address is active and monitored, triggering a surge of even more targeted scam emails',
          isCorrect: true,
          feedback: 'Sharp thinking! Spammers use unsubscribe clicks to validate that an inbox has an active human reader, which increases its value on black-market spam lists.',
        },
        {
          id: 'opt2',
          text: 'The sender is legally compelled by global spam laws to remove you within 10 days',
          isCorrect: false,
          feedback: 'Criminal spammers do not obey legal regulations; they exploit your interaction to send more spam.',
        },
        {
          id: 'opt3',
          text: 'Your email inbox automatically cleans up past messages from that sender',
          isCorrect: false,
          feedback: 'Clicking untrusted links can also lead to malware drive-bys or credential phishing pages.',
        }
      ]
    },
    takeaway: 'For legitimate newsletters you signed up for, use the native mail client "Unsubscribe" header. For blatant spam, mark as Junk/Report Spam without clicking anything.',
  },
  {
    day: 14,
    category: 'digital_life',
    title: 'PERMISSIVE APPS',
    topic: 'Mobile App Permissions & Privacy',
    alertSource: 'MOBILE OS SANDBOX',
    threatType: 'Excessive Hardware Telemetry Access',
    threatSeverity: 'MODERATE',
    quote: 'A flashlight app does not need your contacts list or your precise GPS coordinates.',
    briefing: 'You download a simple single-player puzzle game. Upon opening, it asks for permission to access your Microphone, Contacts, Precise Location, and Background Storage.',
    missionType: 'scenario',
    scenario: {
      question: 'How should you manage mobile app permission requests?',
      options: [
        {
          id: 'opt1',
          text: 'Deny permissions that make no sense for the core feature, and choose "Only while using the app" for necessary ones',
          isCorrect: true,
          feedback: 'Perfect! Restricting permissions prevents data harvesting, background battery drain, and unauthorized telemetry tracking.',
        },
        {
          id: 'opt2',
          text: 'Accept all permissions so you don’t experience glitches during gameplay',
          isCorrect: false,
          feedback: 'Blindly accepting permissions allows unscrupulous developers to sell your location and contacts to ad brokers.',
        },
        {
          id: 'opt3',
          text: 'Turn off your phone’s Bluetooth whenever playing the game',
          isCorrect: false,
          feedback: 'Bluetooth toggling does not prevent the app from reading granted contacts or GPS permissions.',
        }
      ]
    },
    takeaway: 'Principle of least privilege: only grant permissions strictly necessary for the app to function. Revoke location and microphone access for casual apps.',
  },
  {
    day: 15,
    category: 'privacy',
    title: 'THE ROGUE AIRWAVE',
    topic: 'Public Wi-Fi & Evil Twin Attacks',
    alertSource: 'WIRELESS SCANNER',
    threatType: 'Man-in-the-Middle Hotspot',
    threatSeverity: 'HIGH',
    quote: 'Free Wi-Fi often costs more than you think. Secure your tunnel.',
    briefing: 'While waiting at an international airport, your device detects two networks: "Airport_Official_Secure_5G" and "FREE_AIRPORT_SUPER_WIFI_OPEN" (unencrypted, zero password). Neutralize the risk.',
    missionType: 'wifi',
    takeaway: 'Unencrypted public hotspots allow attackers to set up "Evil Twin" portals and capture unencrypted traffic. Always use a trusted VPN on public networks and turn off auto-connect.',
  },
  {
    day: 16,
    category: 'privacy',
    title: 'CLOUD EXPOSURE',
    topic: 'Cloud Storage & Public Links',
    alertSource: 'CLOUD DRIVE AUDITOR',
    threatType: 'Publicly Accessible Shared Folder',
    threatSeverity: 'HIGH',
    quote: 'Anyone with the link means the entire world if the link leaks.',
    briefing: 'You shared a project folder containing your resume, tax ID document, and passport scan. The sharing setting is currently set to "Anyone on the internet with this link can view and edit".',
    missionType: 'scenario',
    scenario: {
      question: 'What is the secure best practice for sharing sensitive documents via cloud storage (Google Drive, OneDrive, Dropbox)?',
      options: [
        {
          id: 'opt1',
          text: 'Share strictly with specific verified email addresses, set "View only", and apply an expiration date or password',
          isCorrect: true,
          feedback: 'Excellent defense! Targeted sharing ensures only authenticated recipients can access files, preventing indexers or unauthorized viewers from seeing them.',
        },
        {
          id: 'opt2',
          text: 'Shorten the public link with a URL shortener so strangers cannot guess the link',
          isCorrect: false,
          feedback: 'URL shorteners are public and brute-forceable; automated bots scan short URLs constantly.',
        },
        {
          id: 'opt3',
          text: 'Leave it public for 48 hours and hope nobody discovers the URL',
          isCorrect: false,
          feedback: 'Leaked public links can be indexed by search engines or leaked through browser extensions and HTTP referrers.',
        }
      ]
    },
    takeaway: 'Never use "Anyone with the link" for personal documents or identification files. Grant access strictly to named accounts and audit shared folders periodically.',
  },
  {
    day: 17,
    category: 'privacy',
    title: 'THE GHOST PROFILE',
    topic: 'Data Brokers & Digital Footprint',
    alertSource: 'PRIVACY AGGREGATOR',
    threatType: 'Public Records Scraped Dossier',
    threatSeverity: 'MODERATE',
    quote: 'If you are not paying for the product, your personal data is the currency.',
    briefing: 'You search your own name online and discover a data broker website displaying your old addresses, phone numbers, family members, and estimated income bracket.',
    missionType: 'scenario',
    scenario: {
      question: 'How can you minimize and clean up your public digital footprint against commercial data brokers?',
      options: [
        {
          id: 'opt1',
          text: 'Submit opt-out removal requests to major data brokers, remove unused old accounts, and tighten social profile privacy',
          isCorrect: true,
          feedback: 'Correct! Taking proactive steps to opt out of people-search sites and closing zombie accounts reduces OSINT data available to scammers.',
        },
        {
          id: 'opt2',
          text: 'Post fake information on all social media so the data brokers get confused',
          isCorrect: false,
          feedback: 'Adding more public activity often creates larger data trails and associates more identifiers with your identity.',
        },
        {
          id: 'opt3',
          text: 'Change your legal name every six months',
          isCorrect: false,
          feedback: 'That is neither practical nor effective, as historical records remain linked.',
        }
      ]
    },
    takeaway: 'Regularly search your name, opt out of people-search sites, and delete abandoned online accounts using automated opt-out guides or services.',
  },
  {
    day: 18,
    category: 'privacy',
    title: 'THE BARCODE TRAP',
    topic: 'QR Code Safety & Quishing',
    alertSource: 'OPTICAL RECOGNITION SCANNER',
    threatType: 'Malicious QR Sticker Overlay',
    threatSeverity: 'HIGH',
    quote: 'Never scan a QR code blindly. You cannot read what is encoded with human eyes.',
    briefing: 'You arrive at a city parking meter. A glossy sticker with a QR code is pasted directly over the official payment instructions: "Scan here to pay $2 parking fee via fast pay". Investigate the code.',
    missionType: 'quishing',
    takeaway: 'Criminals paste fake QR code stickers over authentic signs (Quishing). Always inspect physical stickers for tampering, verify the destination URL before opening, and use official apps.',
  },
  {
    day: 19,
    category: 'transactions',
    title: 'THE FAKE REFUND',
    topic: 'E-Commerce & Market Scam Scenarios',
    alertSource: 'TRANSACTION MONITOR',
    threatType: 'Overpayment & Fake Chargeback Scam',
    threatSeverity: 'HIGH',
    quote: 'When someone sends you too much money and asks for the difference back, it is always a scam.',
    briefing: 'You list a used laptop for $400 on Facebook Marketplace. A buyer claims they mistakenly sent you $750 via a peer-to-peer app and sends a screenshot showing a pending transfer. They plead for you to refund the $350 difference immediately via Zelle.',
    missionType: 'scenario',
    scenario: {
      question: 'What is the true nature of this transaction request?',
      options: [
        {
          id: 'opt1',
          text: 'A classic fake overpayment scam: the initial payment is fraudulent/stolen and will bounce, leaving you out $350 of your own money',
          isCorrect: true,
          feedback: 'Bullseye! Screenshots are easily faked, and stolen funds get reversed by banks days later, while your refund goes straight to the scammer irrevocably.',
        },
        {
          id: 'opt2',
          text: 'A genuine bank accounting error that requires good customer faith to resolve',
          isCorrect: false,
          feedback: 'Never send money back. If an overpayment occurs, instruct the buyer to contact their own bank to reverse the transaction.',
        },
        {
          id: 'opt3',
          text: 'A standard peer-to-peer escrow verification fee',
          isCorrect: false,
          feedback: 'Peer-to-peer apps like Venmo or Zelle do not use overpayments as escrow mechanisms.',
        }
      ]
    },
    takeaway: 'Never refund "accidental overpayments" to buyers using a different payment method or cash. Wait for official bank clearing, which can take weeks.',
  },
  {
    day: 20,
    category: 'transactions',
    title: 'THE GOLDEN PROMISE',
    topic: 'Investment & Pig Butchering Scams',
    alertSource: 'FINANCIAL FRAUD RADAR',
    threatType: 'Guaranteed Return Crypto Platform',
    threatSeverity: 'CRITICAL',
    quote: 'High guaranteed returns with zero risk do not exist in finance—only in scams.',
    briefing: 'A friendly acquaintance you met online introduces you to a "VIP automated crypto trading platform" promising 18% weekly guaranteed profit. The platform interface shows fake rising balances and urges you to deposit more savings.',
    missionType: 'scenario',
    scenario: {
      question: 'What happens when you try to withdraw your funds from this "VIP trading platform"?',
      options: [
        {
          id: 'opt1',
          text: 'The platform blocks withdrawal and demands a 20% "tax or liquidity clearance fee" before freezing your account',
          isCorrect: true,
          feedback: 'Critical warning! This is a "Pig Butchering" scam. The dashboard numbers are completely fabricated, and all deposited funds went directly into the criminal’s wallet.',
        },
        {
          id: 'opt2',
          text: 'The withdrawal processes after a standard 3-day clearing cycle',
          isCorrect: false,
          feedback: 'You will never receive funds back; any additional fees paid will also be stolen.',
        },
        {
          id: 'opt3',
          text: 'The funds are held by the Federal Reserve for audit',
          isCorrect: false,
          feedback: 'Scammers invent authoritative excuses (taxes, anti-money-laundering audits) to squeeze more money out of victims.',
        }
      ]
    },
    takeaway: 'Never invest money on unknown platforms introduced by people you met online. Genuine financial investments carry risk and never guarantee astronomical returns.',
  },
  {
    day: 21,
    category: 'threats',
    title: 'THE PARKING LOT TOKEN',
    topic: 'USB Drops & Physical Payloads',
    alertSource: 'HARDWARE BUS INTERFACE',
    threatType: 'BadUSB Hardware Key Injector',
    threatSeverity: 'CRITICAL',
    quote: 'Curiosity killed the computer. Never plug in unknown hardware.',
    briefing: 'You find a sleek, metallic USB flash drive resting on a bench outside your campus library or office. The label reads: "Confidential - Final Exam Questions & Answer Key 2026". Decide how to neutralize it.',
    missionType: 'usb',
    takeaway: 'Unknown USB drives can be "BadUSB" devices programmed to emulate keyboards, executing malicious keystrokes within 2 seconds of insertion. Hand them to IT security or discard safely.',
  },
  {
    day: 22,
    category: 'threats',
    title: 'THE RANSOM EMBARGO',
    topic: 'Ransomware & Backup Strategies',
    alertSource: 'CRYPTOGRAPHIC AUDITOR',
    threatType: 'File Encryption Threat',
    threatSeverity: 'CRITICAL',
    quote: 'Hope is not a backup strategy. Resilience is built before the disaster.',
    briefing: 'A fellow student’s computer was infected with ransomware. Every assignment, photo, and dissertation file is encrypted with a message demanding $800 in Bitcoin within 48 hours.',
    missionType: 'scenario',
    scenario: {
      question: 'What is the gold-standard 3-2-1 backup strategy to guarantee immunity against ransomware extortion?',
      options: [
        {
          id: 'opt1',
          text: 'Keep 3 copies of your data on 2 different media types, with 1 copy stored completely offsite or air-gapped/immutable',
          isCorrect: true,
          feedback: 'Master defender strategy! With an air-gapped or immutable cloud backup, you can wipe an infected machine and restore everything without paying a cent.',
        },
        {
          id: 'opt2',
          text: 'Pay the ransom immediately because hackers always honor their decryptor keys',
          isCorrect: false,
          feedback: 'Paying the ransom finances criminal syndicates and provides zero guarantee of getting your files back.',
        },
        {
          id: 'opt3',
          text: 'Store all files on an external USB hard drive that stays plugged into your laptop 24/7',
          isCorrect: false,
          feedback: 'If the external drive is constantly connected, modern ransomware will encrypt both the laptop and the backup drive simultaneously.',
        }
      ]
    },
    takeaway: 'Follow the 3-2-1 backup rule: 3 copies, 2 different media, 1 offline or offsite copy. Disconnect backup drives when not actively backing up.',
  },
  {
    day: 23,
    category: 'threats',
    title: 'THE SCARE TACTIC',
    topic: 'Fake Antivirus Popups & Tech Support Scams',
    alertSource: 'SYSTEM RUNTIME MONITOR',
    threatType: 'Browser Lock Screen Scareware',
    threatSeverity: 'HIGH',
    quote: 'Real operating system warnings do not play siren audio or tell you to call a toll-free number.',
    briefing: 'While browsing, your screen suddenly locks full-screen with flashing red lights, loud siren audio, and a banner: "WINDOWS DEFENDER ALERT: ZEUS VIRUS DETECTED! Call Microsoft Support at 1-800-XXX-XXXX immediately. DO NOT SHUT DOWN YOUR PC!"',
    missionType: 'scenario',
    scenario: {
      question: 'What is the safe and correct action to take during this scareware browser freeze?',
      options: [
        {
          id: 'opt1',
          text: 'Force-close the browser tab using Task Manager (or Esc/Alt+F4); do NOT call the phone number',
          isCorrect: true,
          feedback: 'Right on target! This is pure browser scareware using full-screen JavaScript tricks. Calling the number connects you to a boiler room that charges hundreds to "fix" your clean PC.',
        },
        {
          id: 'opt2',
          text: 'Call the 1-800 number and grant them remote desktop access to scan your files',
          isCorrect: false,
          feedback: 'Granting remote access allows the scammers to steal your passwords, lock you out, or install real malware.',
        },
        {
          id: 'opt3',
          text: 'Purchase gift cards to pay the security clearance fee',
          isCorrect: false,
          feedback: 'Legitimate tech companies (Microsoft, Apple, Google) never demand gift cards or phone call verifications for system updates.',
        }
      ]
    },
    takeaway: 'Legitimate OS warnings never include phone numbers to call. If a web page locks your browser, close it via Task Manager or browser process killer.',
  },
  {
    day: 24,
    category: 'browsing',
    title: 'THE DECEPTIVE BUTTON',
    topic: 'Malvertising & Fake Download Portals',
    alertSource: 'HTTP RESPONSE ANALYZER',
    threatType: 'Bundled Adware Hijacker',
    threatSeverity: 'HIGH',
    quote: 'The largest and greenest "Download" button is almost never the real file.',
    briefing: 'You visit a file-sharing page to download an open-source audio editor. The webpage is covered in 4 flashing banners that all shout "DOWNLOAD NOW" and "FAST SPEED FREE INSTALL". Identify the authentic download.',
    missionType: 'download',
    takeaway: 'Download free software exclusively from the developer’s official website or official package managers (GitHub, App Store, Chocolatey, Homebrew) rather than third-party download hubs.',
  },
  {
    day: 25,
    category: 'threats',
    title: 'THE SMART HOME GHOST',
    topic: 'IoT Security & Default Credentials',
    alertSource: 'LOCAL NETWORK DISCOVERY',
    threatType: 'Default Admin Password Vulnerability',
    threatSeverity: 'MODERATE',
    quote: 'If your smart camera still uses admin/admin, anyone with internet access is in your living room.',
    briefing: 'You purchase an inexpensive smart home security camera or Wi-Fi smart plug. You plug it into your home Wi-Fi and notice its default login credentials are "admin / 123456".',
    missionType: 'scenario',
    scenario: {
      question: 'Why are default IoT credentials a major risk on your home network?',
      options: [
        {
          id: 'opt1',
          text: 'Automated internet botnets (like Mirai) constantly scan IP addresses to hijack unconfigured devices for DDoS attacks or spying',
          isCorrect: true,
          feedback: 'Precisely! Thousands of botnets scan the internet non-stop for default IoT credentials to enslave devices into cyber attack armies.',
        },
        {
          id: 'opt2',
          text: 'It will cause your household electricity bill to quadruple',
          isCorrect: false,
          feedback: 'The core risk is network invasion and device takeover, not power consumption.',
        },
        {
          id: 'opt3',
          text: 'The device will stop connecting to Wi-Fi after 7 days',
          isCorrect: false,
          feedback: 'The device continues functioning, but operates as an open surveillance portal for intruders.',
        }
      ]
    },
    takeaway: 'Change default factory passwords on all IoT gear immediately, disable Universal Plug and Play (UPnP) on your router, and isolate smart devices on a guest Wi-Fi network.',
  },
  {
    day: 26,
    category: 'privacy',
    title: 'THE SILENT TAKEOVER',
    topic: 'SIM Swapping & Carrier Security',
    alertSource: 'TELECOM SIGNAL MONITOR',
    threatType: 'Carrier Account Port-out Hijack',
    threatSeverity: 'CRITICAL',
    quote: 'Your phone number was built for calls, not to be the master key to your digital life.',
    briefing: 'Suddenly, your phone loses all cellular reception and displays "No Service" while friends tell you your WhatsApp and banking accounts are receiving password reset requests.',
    missionType: 'scenario',
    scenario: {
      question: 'What is a SIM Swap attack and how can you protect yourself at the carrier level?',
      options: [
        {
          id: 'opt1',
          text: 'An attacker impersonates you to your mobile carrier and transfers your number to their SIM; protect yourself with a carrier account PIN and app-based 2FA',
          isCorrect: true,
          feedback: 'Accurate and critical! By setting a verbal port-out PIN with your cell carrier and migrating logins away from SMS 2FA to app authenticators, you neutralize SIM swaps.',
        },
        {
          id: 'opt2',
          text: 'Someone physically unscrewed your phone while you were asleep',
          isCorrect: false,
          feedback: 'SIM swapping happens remotely at the cellular carrier level through social engineering, not physical theft.',
        },
        {
          id: 'opt3',
          text: 'Your phone battery depleted its internal encryption chip',
          isCorrect: false,
          feedback: 'Battery life has no relation to carrier SIM profile routing.',
        }
      ]
    },
    takeaway: 'Set a custom "Port-Freeze" or account security PIN with your mobile carrier. Decouple your sensitive bank and email accounts from SMS-based recovery.',
  },
  {
    day: 27,
    category: 'transactions',
    title: 'THE URGENT HELPDESK',
    topic: 'OTP Theft & Social Engineering (Vishing)',
    alertSource: 'VOIP CALL GATEWAY',
    threatType: 'Helpdesk Impersonation & 2FA Harvesting',
    threatSeverity: 'CRITICAL',
    quote: 'Never share a one-time passcode with anyone. Legitimate agents never ask for it.',
    briefing: 'You receive an urgent phone call from "CAMPUS IT HELPDESK" claiming unauthorized logins were detected on your account. The caller demands the 6-digit OTP just texted to your phone. Neutralize the attacker.',
    missionType: 'otp',
    takeaway: 'One-time passcodes (OTPs) are meant for your eyes only. Banks, IT departments, and service providers will NEVER call you demanding a passcode you just received.',
  },
  {
    day: 28,
    category: 'identity',
    title: 'THE ZOMBIE ACCOUNT',
    topic: 'Credential Stuffing & Account Hygiene',
    alertSource: 'LEAKED DATABASE MONITOR',
    threatType: 'Credential Stuffing Bot Attack',
    threatSeverity: 'HIGH',
    quote: 'An account you forgot about ten years ago can be the door an attacker walks through today.',
    briefing: 'A breach detection service alerts you that an old password you used for a gaming forum in 2018 appeared in a leaked credentials database. You also used that same password on your school portal.',
    missionType: 'scenario',
    scenario: {
      question: 'What is credential stuffing, and why is password reuse dangerous even for unimportant sites?',
      options: [
        {
          id: 'opt1',
          text: 'Automated bots take leaked username/password combos from compromised sites and try them against thousands of high-value services',
          isCorrect: true,
          feedback: 'Master-level understanding! Attackers do not target the forum; they use the breached password to break into your email, bank, and social accounts.',
        },
        {
          id: 'opt2',
          text: 'The forum will automatically ban your computer IP address from the internet',
          isCorrect: false,
          feedback: 'The threat is cross-site compromise, not IP banning.',
        },
        {
          id: 'opt3',
          text: 'Old accounts naturally encrypt themselves after 5 years',
          isCorrect: false,
          feedback: 'Abandoned accounts remain vulnerable indefinitely unless you delete them or change their credentials.',
        }
      ]
    },
    takeaway: 'Never reuse passwords. When a breach notice arrives, change the password immediately anywhere you might have used that same or a similar password.',
  },
  {
    day: 29,
    category: 'digital_life',
    title: 'SYSTEM IMMUNIZATION',
    topic: 'Software Updates & Zero-Day Patching',
    alertSource: 'KERNEL INTEGRITY DAEMON',
    threatType: 'Unpatched Vulnerability Exploit',
    threatSeverity: 'HIGH',
    quote: 'Software updates are not just feature upgrades; they are digital body armor.',
    briefing: 'Your operating system and smartphone display a notification: "Critical Security Update Available (Fixes actively exploited zero-day vulnerability in web browser engine)".',
    missionType: 'scenario',
    scenario: {
      question: 'Why should you install critical operating system and browser security patches immediately rather than clicking "Remind me in 2 weeks"?',
      options: [
        {
          id: 'opt1',
          text: 'Once a security patch is released publicly, cybercriminals reverse-engineer it to attack all devices that delay updating',
          isCorrect: true,
          feedback: 'Bullseye! Public patches tell attackers exactly where the vulnerabilities were. Delaying updates leaves your device completely exposed to automated exploits.',
        },
        {
          id: 'opt2',
          text: 'Your device manufacturer will legally void your warranty if you skip an update',
          isCorrect: false,
          feedback: 'Warranty rules are not the issue—active exploitation by cybercriminals is the immediate danger.',
        },
        {
          id: 'opt3',
          text: 'Unpatched devices emit radio signals that alert nearby hackers',
          isCorrect: false,
          feedback: 'Exploitation occurs remotely over networks when visiting web pages or processing data, not via radio waves.',
        }
      ]
    },
    takeaway: 'Enable automatic updates for your OS, browsers, and mobile devices. Security patches close the doors that attackers are actively trying to open.',
  },
  {
    day: 30,
    category: 'threats',
    title: 'THE DISCARDED CHIP',
    topic: 'Device Disposal & Data Sanitization',
    alertSource: 'MEDIA DECOMMISSION AUDITOR',
    threatType: 'Recoverable Residual Storage Data',
    threatSeverity: 'MODERATE',
    quote: 'Moving a file to the Trash bin does not erase it from the magnetic or flash surface.',
    briefing: 'You are selling or donating an old laptop and smartphone. You deleted all desktop icons and emptied the Recycle Bin before packaging the device.',
    missionType: 'scenario',
    scenario: {
      question: 'Why is emptying the Recycle Bin or Trash insufficient before giving away or selling an old computer?',
      options: [
        {
          id: 'opt1',
          text: 'Deleting only removes the file pointer; free recovery tools can easily restore the entire raw data unless encrypted and factory reset with wipe',
          isCorrect: true,
          feedback: 'Top-tier data awareness! Standard deletion leaves raw data intact on the drive. You must perform a cryptographic factory erase or secure wipe before disposal.',
        },
        {
          id: 'opt2',
          text: 'The operating system license key will be transferred to the buyer’s cloud account',
          isCorrect: false,
          feedback: 'The real risk is personal photo, document, and session recovery by strangers.',
        },
        {
          id: 'opt3',
          text: 'The Recycle Bin will restore itself once connected to a new Wi-Fi network',
          isCorrect: false,
          feedback: 'Recycle bin data stays on physical storage until overwritten.',
        }
      ]
    },
    takeaway: 'Before selling or recycling any phone, drive, or laptop, enable full disk encryption, perform a factory data wipe, and remove SIM and microSD cards.',
  },
  {
    day: 31,
    category: 'communication',
    title: 'THE SYNTHETIC DECEPTION',
    topic: 'Deepfakes & AI Voice Impersonation',
    alertSource: 'BIOMETRIC INTEGRITY VERIFIER',
    threatType: 'Generative AI Audio/Video Fraud',
    threatSeverity: 'CRITICAL',
    quote: 'Trust, but verify out-of-band: In the age of AI, seeing or hearing is no longer believing.',
    briefing: 'You receive an urgent video call from your university dean or family member. The voice and video look remarkably like them, but they demand an emergency gift card or wire transfer for an urgent deposit. Spot the synthetic cues and verify identity.',
    missionType: 'deepfake',
    takeaway: 'Generative AI voice clones and real-time deepfakes are used in modern social engineering. Always establish a secondary "out-of-band" verification protocol—call them on a known real number or ask a pre-agreed family passphrase.',
  }
];
