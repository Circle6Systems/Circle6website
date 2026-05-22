/**
 * WizardContent -- Structured guide content for the Digital Life Planning Wizard
 *
 * Extracted from digital-life-planning-guide.md (Version 1.1, May 2026)
 * Every checklist item from the guide is represented here with stable IDs
 * for use as IndexedDB keys in the encrypted completion state store.
 *
 * ID format: {path}-{section}-{subsection}-{item}
 *   Path A (Planning Ahead): a-1-1-1, a-1-1-2, ...
 *   Path B (Navigating Loss): b-7-1-1, b-7-1-2, ...
 *
 * This file is a static IIFE module -- no imports/exports.
 */
const WizardContent = (() => {
  'use strict';

  const GUIDE_VERSION = '1.1';
  const GUIDE_DATE = '2026-05';

  // ---------------------------------------------------------------------------
  // Path A: Planning Ahead (Sections 1-6)
  // ---------------------------------------------------------------------------

  const PATH_A_SECTIONS = [
    // =========================================================================
    // SECTION 1 -- Take Inventory of Your Digital Life
    // =========================================================================
    {
      id: 'section-1',
      number: 1,
      title: 'Take Inventory of Your Digital Life',
      path: 'a',
      pdfFile: 'A-01-account-inventory-checklist.pdf',
      description: 'Before you can plan for anything, you need to know what exists. Most people vastly underestimate the size of their digital footprint. The average person has well over 100 online accounts.',
      subsections: [
        {
          id: 'section-1-1',
          title: '1.1 -- Account Inventory Checklist',
          description: 'Work through each category. For every account, record the service name, your username/email, and what the account is used for. Do not put passwords in this list -- that is handled separately in Section 2.',
          categories: [
            {
              id: 'section-1-1-email',
              title: 'Email Accounts',
              items: [
                { id: 'a-1-1-1', text: 'Primary personal email (Gmail, Outlook, Yahoo, ProtonMail, etc.)' },
                { id: 'a-1-1-2', text: 'Secondary/backup email accounts' },
                { id: 'a-1-1-3', text: 'Work or professional email accounts' },
                { id: 'a-1-1-4', text: 'Legacy email accounts you still have but rarely use (old ISP emails, university alumni email, etc.)' },
                { id: 'a-1-1-5', text: 'Email aliases or forwarding addresses' }
              ]
            },
            {
              id: 'section-1-1-financial',
              title: 'Financial & Banking',
              items: [
                { id: 'a-1-1-6', text: 'Bank accounts (checking, savings, money market)' },
                { id: 'a-1-1-7', text: 'Credit card accounts and portals' },
                { id: 'a-1-1-8', text: 'Investment and brokerage accounts' },
                { id: 'a-1-1-9', text: 'Retirement accounts (401k, IRA portals)' },
                { id: 'a-1-1-10', text: 'Cryptocurrency wallets, exchanges, and DeFi accounts' },
                { id: 'a-1-1-11', text: 'Payment platforms (PayPal, Venmo, Zelle, Cash App, Apple Pay, Google Pay)' },
                { id: 'a-1-1-12', text: 'Tax preparation services (TurboTax, H&R Block, etc.)' },
                { id: 'a-1-1-13', text: 'Peer-to-peer lending or crowdfunding accounts' },
                { id: 'a-1-1-14', text: 'Buy Now Pay Later accounts (Affirm, Klarna, Afterpay)' }
              ]
            },
            {
              id: 'section-1-1-social',
              title: 'Social Media & Communication',
              items: [
                { id: 'a-1-1-15', text: 'Facebook / Meta' },
                { id: 'a-1-1-16', text: 'Instagram' },
                { id: 'a-1-1-17', text: 'X (Twitter)' },
                { id: 'a-1-1-18', text: 'LinkedIn' },
                { id: 'a-1-1-19', text: 'TikTok' },
                { id: 'a-1-1-20', text: 'Snapchat' },
                { id: 'a-1-1-21', text: 'Reddit' },
                { id: 'a-1-1-22', text: 'YouTube (if separate from Google)' },
                { id: 'a-1-1-23', text: 'Threads, Bluesky, Mastodon, or other newer platforms' },
                { id: 'a-1-1-24', text: 'Discord servers (especially if you own/admin any)' },
                { id: 'a-1-1-25', text: 'WhatsApp, Signal, Telegram' },
                { id: 'a-1-1-26', text: 'Dating apps (if applicable)' },
                { id: 'a-1-1-27', text: 'Forums or community boards you participate in' }
              ]
            },
            {
              id: 'section-1-1-cloud',
              title: 'Cloud Storage & Photos',
              items: [
                { id: 'a-1-1-28', text: 'Google Drive / Google Photos' },
                { id: 'a-1-1-29', text: 'iCloud / Apple Photos' },
                { id: 'a-1-1-30', text: 'Dropbox' },
                { id: 'a-1-1-31', text: 'OneDrive' },
                { id: 'a-1-1-32', text: 'Box' },
                { id: 'a-1-1-33', text: 'Amazon Photos' },
                { id: 'a-1-1-34', text: 'Other cloud backup services (Backblaze, Carbonite, etc.)' },
                { id: 'a-1-1-35', text: 'Photo printing/book services with stored photos (Shutterfly, Mixbook, etc.)' }
              ]
            },
            {
              id: 'section-1-1-subscriptions',
              title: 'Subscriptions & Recurring Services',
              items: [
                { id: 'a-1-1-36', text: 'Streaming video (Netflix, Hulu, Disney+, Max, Paramount+, Peacock, Apple TV+, Amazon Prime Video, YouTube Premium, etc.)' },
                { id: 'a-1-1-37', text: 'Streaming music (Spotify, Apple Music, Amazon Music, Tidal, YouTube Music, etc.)' },
                { id: 'a-1-1-38', text: 'News and media subscriptions (NYT, WSJ, Washington Post, Substack, etc.)' },
                { id: 'a-1-1-39', text: 'Software subscriptions (Adobe, Microsoft 365, etc.)' },
                { id: 'a-1-1-40', text: 'Gaming subscriptions (PlayStation Plus, Xbox Game Pass, Nintendo Online, Steam, etc.)' },
                { id: 'a-1-1-41', text: 'Meal kit or grocery delivery (HelloFresh, Instacart, etc.)' },
                { id: 'a-1-1-42', text: 'Fitness and health apps (Peloton, gym memberships with apps, meditation apps)' },
                { id: 'a-1-1-43', text: 'AI services (ChatGPT Plus, Claude Pro, Midjourney, etc.)' },
                { id: 'a-1-1-44', text: 'VPN services' },
                { id: 'a-1-1-45', text: 'Domain registrations and website hosting' },
                { id: 'a-1-1-46', text: 'Cloud computing services (AWS, Azure, Google Cloud -- especially if you run anything)' }
              ]
            },
            {
              id: 'section-1-1-shopping',
              title: 'Shopping & E-Commerce',
              items: [
                { id: 'a-1-1-47', text: 'Amazon' },
                { id: 'a-1-1-48', text: 'eBay' },
                { id: 'a-1-1-49', text: 'Etsy' },
                { id: 'a-1-1-50', text: 'Walmart, Target, and other retail accounts' },
                { id: 'a-1-1-51', text: 'Grocery delivery accounts' },
                { id: 'a-1-1-52', text: 'Any accounts with stored payment methods or shipping addresses' }
              ]
            },
            {
              id: 'section-1-1-healthcare',
              title: 'Healthcare & Insurance Portals',
              items: [
                { id: 'a-1-1-53', text: 'Health insurance portal' },
                { id: 'a-1-1-54', text: 'Medicare/Medicaid portals' },
                { id: 'a-1-1-55', text: 'MyChart or other patient portals' },
                { id: 'a-1-1-56', text: 'Pharmacy accounts (CVS, Walgreens, mail-order)' },
                { id: 'a-1-1-57', text: 'Dental, vision, and specialist portals' },
                { id: 'a-1-1-58', text: 'Life insurance online portals' },
                { id: 'a-1-1-59', text: 'FSA/HSA account portals' },
                { id: 'a-1-1-60', text: 'Mental health app accounts (BetterHelp, Talkspace, etc.)' }
              ]
            },
            {
              id: 'section-1-1-government',
              title: 'Government & Official Accounts',
              items: [
                { id: 'a-1-1-61', text: 'Social Security Administration (ssa.gov / my Social Security)' },
                { id: 'a-1-1-62', text: 'IRS account (irs.gov)' },
                { id: 'a-1-1-63', text: 'State tax portal' },
                { id: 'a-1-1-64', text: 'DMV / driver\'s license renewal portal' },
                { id: 'a-1-1-65', text: 'Veterans Affairs (va.gov) if applicable' },
                { id: 'a-1-1-66', text: 'USPS Informed Delivery' },
                { id: 'a-1-1-67', text: 'Voter registration portal' },
                { id: 'a-1-1-68', text: 'TSA PreCheck / Global Entry / CLEAR' },
                { id: 'a-1-1-69', text: 'Passport renewal portal' },
                { id: 'a-1-1-70', text: 'Login.gov and/or ID.me accounts (used for many federal services)' }
              ]
            },
            {
              id: 'section-1-1-smarthome',
              title: 'Smart Home, IoT & Connected Devices',
              items: [
                { id: 'a-1-1-71', text: 'Smart home hub accounts (Google Home, Amazon Alexa/Echo, Apple HomeKit, Samsung SmartThings)' },
                { id: 'a-1-1-72', text: 'Smart thermostat (Nest, Ecobee)' },
                { id: 'a-1-1-73', text: 'Security cameras and doorbells (Ring, Nest, Wyze, Arlo, SimpliSafe)' },
                { id: 'a-1-1-74', text: 'Smart locks and garage door openers' },
                { id: 'a-1-1-75', text: 'Robot vacuums (iRobot, Roborock)' },
                { id: 'a-1-1-76', text: 'Smart lighting (Hue, LIFX)' },
                { id: 'a-1-1-77', text: 'Vehicle accounts and connected car apps (Tesla, FordPass, MyChevrolet, OnStar, etc.)' },
                { id: 'a-1-1-78', text: 'Pet tech (smart feeders, GPS trackers, vet portals)' },
                { id: 'a-1-1-79', text: 'Wearables (Fitbit, Garmin, Whoop, Apple Watch health data)' }
              ]
            },
            {
              id: 'section-1-1-professional',
              title: 'Professional & Business',
              items: [
                { id: 'a-1-1-80', text: 'Professional licenses with online portals' },
                { id: 'a-1-1-81', text: 'Business accounts you own or administer' },
                { id: 'a-1-1-82', text: 'Freelance platform accounts (Upwork, Fiverr, etc.)' },
                { id: 'a-1-1-83', text: 'Domain names you own (and which registrar)' },
                { id: 'a-1-1-84', text: 'Websites or blogs you maintain' },
                { id: 'a-1-1-85', text: 'Professional association memberships' },
                { id: 'a-1-1-86', text: 'CRM or business tool logins' },
                { id: 'a-1-1-87', text: 'Intellectual property registrations' }
              ]
            },
            {
              id: 'section-1-1-loyalty',
              title: 'Loyalty Programs & Rewards',
              items: [
                { id: 'a-1-1-88', text: 'Airline miles accounts' },
                { id: 'a-1-1-89', text: 'Hotel loyalty programs' },
                { id: 'a-1-1-90', text: 'Credit card rewards portals' },
                { id: 'a-1-1-91', text: 'Retail loyalty programs with stored value' },
                { id: 'a-1-1-92', text: 'Cashback programs (Rakuten, Ibotta, etc.)' }
              ]
            },
            {
              id: 'section-1-1-digital-content',
              title: 'Digital Content & Purchases',
              items: [
                { id: 'a-1-1-93', text: 'E-books (Kindle, Nook, Kobo)' },
                { id: 'a-1-1-94', text: 'Digital music purchases (iTunes, Amazon)' },
                { id: 'a-1-1-95', text: 'Digital movie/TV purchases' },
                { id: 'a-1-1-96', text: 'Video game libraries (Steam, PlayStation, Xbox, Nintendo, Epic, GOG)' },
                { id: 'a-1-1-97', text: 'App purchases (iOS App Store, Google Play)' },
                { id: 'a-1-1-98', text: 'NFTs or digital collectibles (if applicable)' }
              ]
            }
          ],
          notes: [
            'Important note about digital purchases: Most digital content (e-books, music, movies, apps) is licensed, not owned. This means it generally cannot be transferred or inherited. Your family may lose access to your Kindle library, iTunes purchases, etc. This is worth knowing when deciding how to preserve important content.'
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 2 -- Secure Your Credentials
    // =========================================================================
    {
      id: 'section-2',
      number: 2,
      title: 'Secure Your Credentials -- The Password & Access Plan',
      path: 'a',
      pdfFile: 'A-02-password-and-access-plan.pdf',
      description: 'This is the single most impactful thing you can do for your survivors. Without access credentials, your loved ones face an uphill battle with every single account -- often requiring death certificates, court orders, and weeks of waiting per account.',
      subsections: [
        {
          id: 'section-2-1',
          title: '2.1 -- Password Manager Setup',
          description: '',
          categories: [
            {
              id: 'section-2-1-setup',
              title: 'Password Manager Setup',
              items: [
                { id: 'a-2-1-1', text: 'Choose and set up a password manager (1Password, Bitwarden, Dashlane, LastPass, Keeper, etc.)' },
                { id: 'a-2-1-2', text: 'Migrate existing passwords from browsers, sticky notes, and memory into the password manager' },
                { id: 'a-2-1-3', text: 'Ensure every account has a unique, strong password (the manager generates these)' },
                { id: 'a-2-1-4', text: 'Set up the password manager\'s emergency access or family sharing feature -- this is critical' }
              ]
            },
            {
              id: 'section-2-1-emergency',
              title: 'Password Manager Emergency Access Features to Configure',
              items: [
                { id: 'a-2-1-5', text: '1Password: Set up a Family or Teams account; share a vault with your trusted person; store your Emergency Kit (account key + master password) in a physical safe' },
                { id: 'a-2-1-6', text: 'Bitwarden: Use the "Emergency Access" feature to grant a trusted contact access after a configurable waiting period' },
                { id: 'a-2-1-7', text: 'Dashlane: Use the "Emergency Contact" feature' },
                { id: 'a-2-1-8', text: 'LastPass: Use the "Emergency Access" feature with a trusted contact and waiting period' },
                { id: 'a-2-1-9', text: 'Keeper: Use the "Emergency Access" (KeeperChat) feature' }
              ]
            }
          ]
        },
        {
          id: 'section-2-2',
          title: '2.2 -- Two-Factor Authentication (2FA) Planning',
          description: 'Two-factor authentication protects your accounts while you are alive, but it can lock everyone out after you die if not planned for.',
          categories: [
            {
              id: 'section-2-2-2fa',
              title: 'Two-Factor Authentication Planning',
              items: [
                { id: 'a-2-2-1', text: 'Document which accounts have 2FA enabled' },
                { id: 'a-2-2-2', text: 'Store 2FA backup/recovery codes in your password manager AND in a physical location (printed, in a safe or sealed envelope)' },
                { id: 'a-2-2-3', text: 'If you use an authenticator app (Google Authenticator, Authy, Microsoft Authenticator), document which app and what device it is on' },
                { id: 'a-2-2-4', text: 'Consider using Authy (which allows multi-device sync and cloud backup) instead of Google Authenticator (which is device-bound)' },
                { id: 'a-2-2-5', text: 'If you use a hardware security key (YubiKey, Titan), document where it is physically located and register backup keys' },
                { id: 'a-2-2-6', text: 'Store your phone\'s passcode/PIN securely -- many 2FA methods require the phone itself' },
                { id: 'a-2-2-7', text: 'Document your phone carrier\'s account PIN/password (needed to transfer or cancel service, and to prevent SIM-swap attacks on 2FA)' }
              ]
            }
          ]
        },
        {
          id: 'section-2-3',
          title: '2.3 -- Device Access',
          description: '',
          categories: [
            {
              id: 'section-2-3-devices',
              title: 'Device Access',
              items: [
                { id: 'a-2-3-1', text: 'Document the passcode/PIN/password for every device: phones, tablets, laptops, desktops' },
                { id: 'a-2-3-2', text: 'Document biometric backup methods (your fingerprint won\'t work, but backup PINs will)' },
                { id: 'a-2-3-3', text: 'Document the Apple ID password or Google account password tied to each device' },
                { id: 'a-2-3-4', text: 'Note any encrypted drives or volumes and their decryption passwords' },
                { id: 'a-2-3-5', text: 'Record the location of any recovery keys for disk encryption (FileVault, BitLocker)' },
                { id: 'a-2-3-6', text: 'If you have a NAS (network-attached storage) or home server, document its admin credentials' }
              ]
            }
          ]
        },
        {
          id: 'section-2-4',
          title: '2.4 -- Physical Storage of Access Information',
          description: '',
          categories: [
            {
              id: 'section-2-4-storage',
              title: 'Physical Storage of Access Information',
              items: [
                { id: 'a-2-4-1', text: 'Store your password manager\'s master password and emergency kit in a fireproof safe, safe deposit box, or sealed envelope with your attorney or trusted person' },
                { id: 'a-2-4-2', text: 'Consider splitting sensitive information (e.g., the master password in one location, the emergency kit in another)' },
                { id: 'a-2-4-3', text: 'Let your executor/trusted person know where this information is, without telling them what it is yet' },
                { id: 'a-2-4-4', text: 'Review and update this information at least annually' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 3 -- Configure Platform Legacy & Inactive Account Settings
    // =========================================================================
    {
      id: 'section-3',
      number: 3,
      title: 'Configure Platform Legacy & Inactive Account Settings',
      path: 'a',
      pdfFile: 'A-03-platform-legacy-settings.pdf',
      description: 'Many major platforms now offer built-in tools to manage what happens to your account. Setting these up takes minutes and saves your survivors enormous headaches.',
      subsections: [
        {
          id: 'section-3-1',
          title: '3.1 -- Platform-by-Platform Legacy Settings',
          description: '',
          categories: [
            {
              id: 'section-3-1-google',
              title: 'Google (Gmail, Drive, Photos, YouTube, etc.)',
              items: [
                { id: 'a-3-1-1', text: 'Set up Google Inactive Account Manager at myaccount.google.com/inactive' },
                { id: 'a-3-1-2', text: 'Choose an inactivity timeout period (3, 6, 12, or 18 months)' },
                { id: 'a-3-1-3', text: 'Add up to 10 trusted contacts to notify and/or share data with' },
                { id: 'a-3-1-4', text: 'Choose which data types each contact receives' },
                { id: 'a-3-1-5', text: 'Decide whether to auto-delete the account after contacts are notified' }
              ],
              tips: ['If you have a YouTube channel with subscribers or revenue, this is especially important']
            },
            {
              id: 'section-3-1-apple',
              title: 'Apple (iCloud, Photos, Messages, etc.)',
              items: [
                { id: 'a-3-1-6', text: 'Set up Apple Legacy Contacts in Settings > [Your Name] > Sign-In & Security > Legacy Contact (iOS 15.2+)' },
                { id: 'a-3-1-7', text: 'Add up to 5 Legacy Contacts' },
                { id: 'a-3-1-8', text: 'Share the generated access key with each contact (print it, AirDrop it, or save it in Messages)' }
              ],
              tips: [
                'Legacy Contacts will need the access key AND a death certificate',
                'Legacy Contacts cannot access Keychain passwords, payment info, or licensed media',
                'Apple will permanently delete the account 3 years after Legacy Contact access is granted'
              ]
            },
            {
              id: 'section-3-1-facebook',
              title: 'Facebook / Meta',
              items: [
                { id: 'a-3-1-9', text: 'Set up a Legacy Contact in Settings > Accounts Center > Personal Details > Account Ownership and Control > Memorialization' },
                { id: 'a-3-1-10', text: 'Choose whether the Legacy Contact can download a copy of your data' },
                { id: 'a-3-1-11', text: 'Alternatively, choose to have your account permanently deleted after death' }
              ],
              tips: [
                'Legacy Contacts can pin a tribute post, change profile/cover photo, and accept friend requests -- but cannot read messages, remove content, or log in as you'
              ]
            },
            {
              id: 'section-3-1-instagram',
              title: 'Instagram',
              items: [
                { id: 'a-3-1-12', text: 'Currently no legacy contact feature -- account can only be memorialized or deleted by a verified family member after death' },
                { id: 'a-3-1-13', text: 'Consider downloading your data periodically (Settings > Your Activity > Download Your Information) and storing it locally' }
              ]
            },
            {
              id: 'section-3-1-twitter',
              title: 'X (Twitter)',
              items: [
                { id: 'a-3-1-14', text: 'Currently no legacy contact or memorialization feature' },
                { id: 'a-3-1-15', text: 'A verified family member or estate representative can request deactivation with documentation' },
                { id: 'a-3-1-16', text: 'Account may auto-delete after extended inactivity' }
              ]
            },
            {
              id: 'section-3-1-linkedin',
              title: 'LinkedIn',
              items: [
                { id: 'a-3-1-17', text: 'Currently no legacy contact feature' },
                { id: 'a-3-1-18', text: 'A verified family member can request a memorial page or account closure' },
                { id: 'a-3-1-19', text: 'Consider exporting your connections and data periodically' }
              ]
            },
            {
              id: 'section-3-1-microsoft',
              title: 'Microsoft (Outlook, OneDrive, Xbox, etc.)',
              items: [
                { id: 'a-3-1-20', text: 'Microsoft\'s "Next of Kin" process allows limited data access with a court order, death certificate, and proof of relationship' },
                { id: 'a-3-1-21', text: 'Accounts auto-close after 2 years of inactivity' }
              ],
              tips: ['Microsoft\'s policies are among the more restrictive -- plan accordingly']
            },
            {
              id: 'section-3-1-other',
              title: 'Other Platforms',
              items: [
                { id: 'a-3-1-22', text: 'Check each platform you use for legacy/inactive account settings' },
                { id: 'a-3-1-23', text: 'For platforms with no legacy tools, ensure your executor knows the account exists and that credentials are accessible through your password manager' }
              ]
            }
          ]
        },
        {
          id: 'section-3-2',
          title: '3.2 -- Email-Specific Considerations',
          description: 'Your primary email is often the skeleton key to your entire digital life -- it is the recovery address for almost every other account. Securing email access for your executor is arguably the single highest-priority digital planning task.',
          categories: [
            {
              id: 'section-3-2-email',
              title: 'Email-Specific Considerations',
              items: [
                { id: 'a-3-2-1', text: 'Ensure your executor can access your primary email (via password manager emergency access or legacy contact settings)' },
                { id: 'a-3-2-2', text: 'Consider setting up a forwarding rule or shared access with a trusted person on at least one email account' },
                { id: 'a-3-2-3', text: 'Document which email address is the recovery/reset email for your major accounts' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 4 -- Designate a Digital Executor
    // =========================================================================
    {
      id: 'section-4',
      number: 4,
      title: 'Designate a Digital Executor',
      path: 'a',
      pdfFile: 'A-04-digital-executor-designation.pdf',
      description: 'Your digital executor may or may not be the same person as the executor of your will. Choose someone who is comfortable with technology, trustworthy with sensitive information, and ideally younger or at least tech-savvy enough to navigate online account recovery processes.',
      subsections: [
        {
          id: 'section-4-1',
          title: '4.1 -- Choosing Your Digital Executor',
          description: '',
          categories: [
            {
              id: 'section-4-1-choosing',
              title: 'Choosing Your Digital Executor',
              items: [
                { id: 'a-4-1-1', text: 'Choose a digital executor (and a backup)' },
                { id: 'a-4-1-2', text: 'Have a conversation with them about the role and what it involves' },
                { id: 'a-4-1-3', text: 'Show them where your password manager emergency information is stored' },
                { id: 'a-4-1-4', text: 'Let them know about this guide' }
              ]
            }
          ]
        },
        {
          id: 'section-4-2',
          title: '4.2 -- Legal Authorization',
          description: '',
          categories: [
            {
              id: 'section-4-2-legal',
              title: 'Legal Authorization',
              items: [
                { id: 'a-4-2-1', text: 'Include digital assets in your will or trust' },
                { id: 'a-4-2-2', text: 'Specifically authorize your executor to access your digital accounts -- RUFADAA (Revised Uniform Fiduciary Access to Digital Assets Act), adopted in 48 U.S. states, provides a framework, but explicit consent in your estate documents is strongest' },
                { id: 'a-4-2-3', text: 'Consider including language authorizing your executor to bypass two-factor authentication and use backup codes' },
                { id: 'a-4-2-4', text: 'Ask your estate planning attorney about a separate digital estate plan document (keeps passwords out of the public will)' },
                { id: 'a-4-2-5', text: 'If you hold cryptocurrency, include a specific crypto clause in your estate documents acknowledging these holdings' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 5 -- Plan for Specific Digital Scenarios
    // =========================================================================
    {
      id: 'section-5',
      number: 5,
      title: 'Plan for Specific Digital Scenarios',
      path: 'a',
      pdfFile: 'A-05-specific-scenarios.pdf',
      description: '',
      subsections: [
        {
          id: 'section-5-1',
          title: '5.1 -- Cryptocurrency & Digital Financial Assets',
          description: 'Crypto is fundamentally different from bank accounts. There is no customer service number. No one can reset your password. If your private keys or seed phrases are lost, the assets are gone permanently.',
          categories: [
            {
              id: 'section-5-1-crypto',
              title: 'Cryptocurrency & Digital Financial Assets',
              items: [
                { id: 'a-5-1-1', text: 'Document all cryptocurrency holdings (coins/tokens, amounts, wallets, exchanges)' },
                { id: 'a-5-1-2', text: 'Store seed phrases / recovery phrases in a physical, secure location (fireproof safe, safe deposit box, or split across multiple locations)' },
                { id: 'a-5-1-3', text: 'Never store seed phrases digitally in a way that could be hacked (not in email, not in cloud storage, not in a text file)' },
                { id: 'a-5-1-4', text: 'Consider a hardware wallet (Ledger, Trezor) with the device and PIN stored securely' },
                { id: 'a-5-1-5', text: 'Consider multi-signature wallets with a co-signer who is your executor' },
                { id: 'a-5-1-6', text: 'Write plain-language instructions for a non-crypto-savvy person on how to access and liquidate' },
                { id: 'a-5-1-7', text: 'Document which exchanges hold funds and how to access them' }
              ]
            }
          ]
        },
        {
          id: 'section-5-2',
          title: '5.2 -- Businesses, Domains & Online Revenue',
          description: '',
          categories: [
            {
              id: 'section-5-2-business',
              title: 'Businesses, Domains & Online Revenue',
              items: [
                { id: 'a-5-2-1', text: 'Document all domains you own and their registrars (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.)' },
                { id: 'a-5-2-2', text: 'Ensure domain auto-renewal is on to prevent expiration during estate settlement' },
                { id: 'a-5-2-3', text: 'Document any websites or blogs and their hosting providers' },
                { id: 'a-5-2-4', text: 'Transfer admin access for business social media pages to at least one other person' },
                { id: 'a-5-2-5', text: 'Document any online revenue streams (YouTube monetization, affiliate programs, ad revenue, Patreon, Substack, etc.)' },
                { id: 'a-5-2-6', text: 'For online businesses, document the tech stack, hosting, and any critical vendor relationships' },
                { id: 'a-5-2-7', text: 'If you admin Discord servers, Slack workspaces, or online communities, designate co-admins' }
              ]
            }
          ]
        },
        {
          id: 'section-5-3',
          title: '5.3 -- Smart Home & Connected Devices',
          description: 'This is increasingly urgent and often overlooked. When someone dies, their smart home can become an obstacle course for survivors -- locks they can\'t open, thermostats they can\'t control, security cameras they can\'t access or disable.',
          categories: [
            {
              id: 'section-5-3-smarthome',
              title: 'Smart Home & Connected Devices',
              items: [
                { id: 'a-5-3-1', text: 'Document the primary account holder for each smart home system' },
                { id: 'a-5-3-2', text: 'Ensure at least one other household member has admin/owner access (not just "member" access) to smart home platforms' },
                { id: 'a-5-3-3', text: 'Document Wi-Fi network name and password' },
                { id: 'a-5-3-4', text: 'Document router admin login' },
                { id: 'a-5-3-5', text: 'List all connected devices and what account controls each one' },
                { id: 'a-5-3-6', text: 'Smart locks: Ensure someone else has the master code or physical backup key' },
                { id: 'a-5-3-7', text: 'Security systems: Ensure someone else can arm/disarm and knows the monitoring company\'s cancel/transfer process' },
                { id: 'a-5-3-8', text: 'Connected vehicles: Document how to transfer ownership of connected car accounts (Tesla, etc.) and note that some features may require re-subscription' },
                { id: 'a-5-3-9', text: 'Smart speakers/assistants: Note that these may contain voice purchasing settings, calendar information, and other personal data' }
              ]
            }
          ]
        },
        {
          id: 'section-5-4',
          title: '5.4 -- Photos, Memories & Sentimental Digital Assets',
          description: 'These are often the most emotionally important digital assets -- and the most at risk of being lost.',
          categories: [
            {
              id: 'section-5-4-photos',
              title: 'Photos, Memories & Sentimental Digital Assets',
              items: [
                { id: 'a-5-4-1', text: 'Identify where your photos and videos are stored (phone, cloud services, external drives, old computers)' },
                { id: 'a-5-4-2', text: 'Create at least one consolidated backup of irreplaceable photos and videos on a physical drive' },
                { id: 'a-5-4-3', text: 'Store that drive in a known, safe location and tell someone where it is' },
                { id: 'a-5-4-4', text: 'Consider printing or creating a physical photo book of the most important photos -- physical copies survive platform changes and account lockouts' },
                { id: 'a-5-4-5', text: 'Document any personal writing, journals, or creative work stored digitally and your wishes for them' },
                { id: 'a-5-4-6', text: 'Note any voicemails, voice messages, or audio recordings you\'d want preserved' }
              ]
            }
          ]
        },
        {
          id: 'section-5-5',
          title: '5.5 -- Email and Message Archives',
          description: '',
          categories: [
            {
              id: 'section-5-5-email',
              title: 'Email and Message Archives',
              items: [
                { id: 'a-5-5-1', text: 'Consider using Google Takeout, Apple data export, or similar tools to periodically download email archives' },
                { id: 'a-5-5-2', text: 'Document your wishes: should your executor read your emails? Delete them? Preserve them?' },
                { id: 'a-5-5-3', text: 'Note any important ongoing email threads (legal, financial, personal) that your executor may need' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 6 -- Protect Against Posthumous Identity Theft
    // =========================================================================
    {
      id: 'section-6',
      number: 6,
      title: 'Protect Against Posthumous Identity Theft',
      path: 'a',
      pdfFile: 'A-06-identity-theft-protection.pdf',
      description: 'An estimated 2.5 million deceased individuals are victims of identity fraud annually. The period immediately after death is especially vulnerable because there is a gap between the death and when government agencies and financial institutions are notified.',
      subsections: [
        {
          id: 'section-6-1',
          title: '6.1 -- Pre-Planning to Reduce Risk',
          description: '',
          categories: [
            {
              id: 'section-6-1-preplanning',
              title: 'Pre-Planning to Reduce Risk',
              items: [
                { id: 'a-6-1-1', text: 'Minimize the personal information in any future obituary (avoid full birthdate, mother\'s maiden name, home address, specific employment history)' },
                { id: 'a-6-1-2', text: 'Set up credit monitoring or freeze your credit proactively -- this also makes it easier for survivors to lock things down' },
                { id: 'a-6-1-3', text: 'Shred physical documents with sensitive information rather than discarding them' },
                { id: 'a-6-1-4', text: 'Be aware that genealogy sites, voter registration databases, and social media profiles all provide information that thieves use to assemble identities' },
                { id: 'a-6-1-5', text: 'Consider opting out of data broker sites while you are alive (services like DeleteMe can help)' }
              ]
            }
          ]
        },
        {
          id: 'section-6-2',
          title: '6.2 -- Instructions for Your Executor (Pre-Plan These Steps)',
          description: 'Leave a note for your executor with these steps so they know what to do quickly.',
          categories: [
            {
              id: 'section-6-2-executor',
              title: 'Instructions for Your Executor',
              items: [
                { id: 'a-6-2-1', text: 'Notify the Social Security Administration (1-800-772-1213) as soon as possible' },
                { id: 'a-6-2-2', text: 'Send death certificate copies to all three credit bureaus (Equifax, Experian, TransUnion) and request a "deceased" alert and credit freeze' },
                { id: 'a-6-2-3', text: 'Notify the IRS (to prevent fraudulent tax returns)' },
                { id: 'a-6-2-4', text: 'Cancel the deceased\'s driver\'s license with the DMV' },
                { id: 'a-6-2-5', text: 'Notify banks and financial institutions immediately' },
                { id: 'a-6-2-6', text: 'Monitor credit reports for at least 12 months for new activity' },
                { id: 'a-6-2-7', text: 'Forward or stop physical mail (thieves monitor mailboxes of the deceased)' },
                { id: 'a-6-2-8', text: 'Be cautious of "bereavement scams" -- fraudsters who use obituary details to impersonate acquaintances of the deceased' }
              ]
            }
          ]
        }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // Path B: Navigating Loss (Sections 7-11)
  // ---------------------------------------------------------------------------

  const PATH_B_SECTIONS = [
    // =========================================================================
    // SECTION 7 -- Immediate Priorities (First 48-72 Hours)
    // =========================================================================
    {
      id: 'section-7',
      number: 7,
      title: 'Immediate Priorities',
      path: 'b',
      pdfFile: 'B-01-the-first-few-days.pdf',
      guideline: 'Suggested pacing: first few days after starting',
      description: 'If you are reading this section, you may be in the middle of one of the hardest experiences of your life. These are things to consider early on, but there is no deadline. Take concrete steps at your own pace. Not everything needs to happen at once. Prioritize based on urgency -- security and financial accounts first, sentimental and social media accounts later.',
      subsections: [
        {
          id: 'section-7-1',
          title: '7.1 -- Secure the Devices',
          description: '',
          categories: [
            {
              id: 'section-7-1-devices',
              title: 'Secure the Devices',
              items: [
                { id: 'b-7-1-1', text: 'Locate all devices: phones, tablets, laptops, desktops, smart watches' },
                { id: 'b-7-1-2', text: 'Do not wipe, reset, or update any device. Keep them charged and powered on if possible -- some have auto-lock or auto-erase features after too many failed attempts' },
                { id: 'b-7-1-3', text: 'If you know the passcode, unlock the device and disable auto-lock temporarily' },
                { id: 'b-7-1-4', text: 'If you don\'t know the passcode, set the device aside safely -- you may need it later for account recovery' },
                { id: 'b-7-1-5', text: 'Check if the phone has biometric login (Face ID / fingerprint) -- this will stop working, but the backup PIN is what you need' },
                { id: 'b-7-1-6', text: 'Plug in and charge all devices to prevent data loss from dead batteries' },
                { id: 'b-7-1-7', text: 'Locate any physical security keys (YubiKey, Titan) and keep them safe' }
              ]
            }
          ]
        },
        {
          id: 'section-7-2',
          title: '7.2 -- Secure the Email',
          description: '',
          categories: [
            {
              id: 'section-7-2-email',
              title: 'Secure the Email',
              items: [
                { id: 'b-7-2-1', text: 'Access the deceased\'s primary email as soon as possible -- this is the gateway to every other account' },
                { id: 'b-7-2-2', text: 'Check for any urgent messages (financial alerts, bills due, pending transactions)' },
                { id: 'b-7-2-3', text: 'Watch for password reset emails that might indicate someone else is trying to access accounts' },
                { id: 'b-7-2-4', text: 'Do NOT delete any emails -- you may need them for estate settlement' }
              ]
            }
          ]
        },
        {
          id: 'section-7-3',
          title: '7.3 -- Stop the Financial Bleeding',
          description: '',
          categories: [
            {
              id: 'section-7-3-financial',
              title: 'Stop the Financial Bleeding',
              items: [
                { id: 'b-7-3-1', text: 'Identify recurring subscriptions and charges by reviewing email (search for "receipt," "subscription," "renewal," "payment," "invoice")' },
                { id: 'b-7-3-2', text: 'Review bank and credit card statements for recurring charges' },
                { id: 'b-7-3-3', text: 'Cancel or pause subscriptions that are actively draining funds' },
                { id: 'b-7-3-4', text: 'Contact banks and credit card companies to flag the account and prevent new charges' },
                { id: 'b-7-3-5', text: 'If the deceased had autopay set up for bills, determine which ones are critical to keep running (mortgage, utilities, insurance) vs. which to cancel' }
              ]
            }
          ]
        },
        {
          id: 'section-7-4',
          title: '7.4 -- Smart Home Immediate Actions',
          description: 'If you live in the home and cannot control smart devices.',
          categories: [
            {
              id: 'section-7-4-smarthome',
              title: 'Smart Home Immediate Actions',
              items: [
                { id: 'b-7-4-1', text: 'If locked out of smart locks, use physical backup keys' },
                { id: 'b-7-4-2', text: 'If unable to control the thermostat, look for manual override on the device itself' },
                { id: 'b-7-4-3', text: 'If security cameras are recording and you can\'t access them, unplug them for now and address access later' },
                { id: 'b-7-4-4', text: 'If Alexa/Google Home are responding to the deceased\'s commands or purchasing settings, unplug them until you can reconfigure' },
                { id: 'b-7-4-5', text: 'Contact the security monitoring company to transfer or cancel service' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 8 -- Short-Term Actions (First 1-4 Weeks)
    // =========================================================================
    {
      id: 'section-8',
      number: 8,
      title: 'Short-Term Actions',
      path: 'b',
      pdfFile: 'A-07-immediate-priorities-48-72-hours.pdf',
      guideline: 'Suggested pacing: when you are ready, usually within the first few weeks',
      description: 'These are steps that benefit from being addressed relatively early, but only when you feel ready. The timeframe is a guideline, not a deadline. Some people move through these in days, others take longer. Both are fine.',
      subsections: [
        {
          id: 'section-8-1',
          title: '8.1 -- Protect Against Identity Theft',
          description: '',
          categories: [
            {
              id: 'section-8-1-identity',
              title: 'Protect Against Identity Theft',
              items: [
                { id: 'b-8-1-1', text: 'Notify the Social Security Administration of the death (call 1-800-772-1213)' },
                { id: 'b-8-1-2', text: 'Send certified copies of the death certificate to all three credit bureaus: Equifax (P.O. Box 105139, Atlanta, GA 30348), Experian (P.O. Box 4500, Allen, TX 75013), TransUnion (P.O. Box 2000, Chester, PA 19016)' },
                { id: 'b-8-1-3', text: 'Request that each bureau flag the file as "deceased" and freeze credit' },
                { id: 'b-8-1-4', text: 'Send a copy of the death certificate to the IRS to flag the SSN' },
                { id: 'b-8-1-5', text: 'Cancel the driver\'s license with the DMV' },
                { id: 'b-8-1-6', text: 'Monitor the deceased\'s credit reports monthly for at least the next year' },
                { id: 'b-8-1-7', text: 'Notify USPS to forward or hold mail' },
                { id: 'b-8-1-8', text: 'Be wary of phishing emails, scam calls, or strangers reaching out claiming to know the deceased -- "bereavement scams" are common' },
                { id: 'b-8-1-9', text: 'If the obituary is published online, be cautious about how much personal detail it contains' }
              ]
            }
          ]
        },
        {
          id: 'section-8-2',
          title: '8.2 -- Begin Account-by-Account Review',
          description: 'Using the deceased\'s email, password manager, and any documentation they left.',
          categories: [
            {
              id: 'section-8-2-accounts',
              title: 'Account-by-Account Review',
              items: [
                { id: 'b-8-2-1', text: 'Create a master spreadsheet of discovered accounts (account name, status, action needed, date completed)' },
                { id: 'b-8-2-2', text: 'Prioritize: financial accounts > email > cloud storage > social media > everything else' },
                { id: 'b-8-2-3', text: 'For each account, determine whether to: transfer ownership, memorialize, close/delete, or leave alone for now' },
                { id: 'b-8-2-4', text: 'Keep records of every call, email, and ticket number -- you will need them' },
                { id: 'b-8-2-5', text: 'Request a deceased person\'s credit report to discover financial accounts you might not know about' }
              ]
            }
          ]
        },
        {
          id: 'section-8-3',
          title: '8.3 -- Social Media Decisions',
          description: 'There is no rush on these. Take your time.',
          categories: [
            {
              id: 'section-8-3-social',
              title: 'Social Media Decisions',
              items: [
                { id: 'b-8-3-1', text: 'Decide whether to memorialize, delete, or leave each social media account as-is' },
                { id: 'b-8-3-2', text: 'If memorializing on Facebook: use the Memorialization Request form or contact the Legacy Contact' },
                { id: 'b-8-3-3', text: 'If deleting: gather any content you want to preserve FIRST (download photos, save posts, screenshot meaningful exchanges)' },
                { id: 'b-8-3-4', text: 'Consider downloading a full data archive from each platform before making changes' },
                { id: 'b-8-3-5', text: 'If the deceased\'s accounts are public, be aware that bots and scammers may target the profile -- consider restricting access or memorializing sooner rather than later' },
                { id: 'b-8-3-6', text: 'Notify admin/moderator roles: if the deceased administered Facebook Groups, Pages, Discord servers, or other communities, work with co-admins or platform support to transfer admin rights' }
              ]
            }
          ]
        },
        {
          id: 'section-8-4',
          title: '8.4 -- Ongoing Subscription & Service Cancellation',
          description: '',
          categories: [
            {
              id: 'section-8-4-subscriptions',
              title: 'Ongoing Subscription & Service Cancellation',
              items: [
                { id: 'b-8-4-1', text: 'Use the email account to search for all subscription-related emails' },
                { id: 'b-8-4-2', text: 'Check app stores (iOS App Store, Google Play) for active subscriptions' },
                { id: 'b-8-4-3', text: 'Check the password manager for accounts that may have payment methods attached' },
                { id: 'b-8-4-4', text: 'Cancel streaming services, SaaS subscriptions, and memberships' },
                { id: 'b-8-4-5', text: 'Contact domain registrars if the deceased owned domains -- don\'t let them lapse if they\'re needed for business continuity' },
                { id: 'b-8-4-6', text: 'Cancel or transfer utility accounts tied to online portals' },
                { id: 'b-8-4-7', text: 'Address any "Buy Now Pay Later" balances' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 9 -- Medium-Term Actions (1-6 Months)
    // =========================================================================
    {
      id: 'section-9',
      number: 9,
      title: 'Medium-Term Actions',
      path: 'b',
      pdfFile: 'A-08-ongoing-actions.pdf',
      guideline: 'Suggested pacing: over the coming weeks and months, as you are able',
      description: 'These items can be spread over time. There is no urgency. Focus on what matters most to you first, and return to the rest when you have the energy.',
      subsections: [
        {
          id: 'section-9-1',
          title: '9.1 -- Digital Asset Settlement',
          description: '',
          categories: [
            {
              id: 'section-9-1-settlement',
              title: 'Digital Asset Settlement',
              items: [
                { id: 'b-9-1-1', text: 'Work with the estate attorney on any accounts that require legal documentation to access' },
                { id: 'b-9-1-2', text: 'Gather and file any paperwork required by platforms (death certificates, letters testamentary, court orders)' },
                { id: 'b-9-1-3', text: 'Transfer ownership of any domains, websites, or online businesses' },
                { id: 'b-9-1-4', text: 'Address cryptocurrency holdings -- if seed phrases or keys are accessible, consult with a crypto-knowledgeable financial advisor or attorney before moving funds' },
                { id: 'b-9-1-5', text: 'Determine the value of any digital assets that may be part of the estate (revenue-generating accounts, crypto, domain names, digital businesses)' },
                { id: 'b-9-1-6', text: 'File final tax returns and note any digital income sources' }
              ]
            }
          ]
        },
        {
          id: 'section-9-2',
          title: '9.2 -- Data Preservation',
          description: '',
          categories: [
            {
              id: 'section-9-2-preservation',
              title: 'Data Preservation',
              items: [
                { id: 'b-9-2-1', text: 'Download and archive photos, videos, and documents from all cloud services' },
                { id: 'b-9-2-2', text: 'Export email archives if desired' },
                { id: 'b-9-2-3', text: 'Save any voicemails, voice messages, or audio recordings' },
                { id: 'b-9-2-4', text: 'Back up phone data (photos, texts, voicemails) before the phone plan is cancelled or the device is wiped' },
                { id: 'b-9-2-5', text: 'Create a consolidated memorial archive on a physical drive and/or shared cloud folder for family' },
                { id: 'b-9-2-6', text: 'Consider creating a printed photo book or other physical memorial artifact from digital photos' }
              ]
            }
          ]
        },
        {
          id: 'section-9-3',
          title: '9.3 -- Online Presence Cleanup',
          description: '',
          categories: [
            {
              id: 'section-9-3-cleanup',
              title: 'Online Presence Cleanup',
              items: [
                { id: 'b-9-3-1', text: 'Review and update/remove online profiles that might still appear in search results' },
                { id: 'b-9-3-2', text: 'Remove the deceased from data broker sites (or use a service like DeleteMe)' },
                { id: 'b-9-3-3', text: 'Cancel any USPS Informed Delivery account' },
                { id: 'b-9-3-4', text: 'Close or remove listings on professional directories' },
                { id: 'b-9-3-5', text: 'If the deceased had a personal website or blog, decide whether to maintain it as a memorial, archive it, or take it down' },
                { id: 'b-9-3-6', text: 'Google the deceased\'s name periodically to catch any unauthorized use of their identity' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 10 -- Long-Term Vigilance
    // =========================================================================
    {
      id: 'section-10',
      number: 10,
      title: 'Long-Term Vigilance',
      path: 'b',
      pdfFile: 'A-08-ongoing-actions.pdf',
      description: '',
      subsections: [
        {
          id: 'section-10-1',
          title: '10.1 -- Long-Term Monitoring',
          description: '',
          categories: [
            {
              id: 'section-10-1-monitoring',
              title: 'Long-Term Vigilance',
              items: [
                { id: 'b-10-1-1', text: 'Continue monitoring credit reports for at least 2 years -- identity thieves are patient and may wait months or years before exploiting a deceased person\'s identity' },
                { id: 'b-10-1-2', text: 'Watch for annual subscription renewals that may not appear until months later' },
                { id: 'b-10-1-3', text: 'Keep a record of all accounts that were closed, transferred, or memorialized' },
                { id: 'b-10-1-4', text: 'Maintain the physical backup of preserved digital memories in a safe location' },
                { id: 'b-10-1-5', text: 'Be aware that some platforms (Apple) will automatically delete accounts after a set period once legacy access is granted -- retrieve everything you want before that deadline' }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // SECTION 11 -- Path B: Discovering and Accessing Accounts With No Plan
    // =========================================================================
    {
      id: 'section-11',
      number: 11,
      title: 'Discovering and Accessing Accounts With No Plan in Place',
      path: 'b',
      pdfFile: 'B-02-discovering-the-digital-footprint.pdf',
      description: 'This section is for people who have lost someone and are starting from scratch. There was no password list, no digital executor, no legacy contacts configured, no instructions left behind. You are figuring it all out while grieving, and that is an incredibly difficult position to be in.',
      subsections: [
        {
          id: 'section-11-1',
          title: '11.1 -- The Starting Point: Discovery Methods',
          description: 'Before you can access accounts, you need to find out what accounts existed. Here are the most effective discovery methods when no inventory was left behind.',
          categories: [
            {
              id: 'section-11-1-devices',
              title: 'Check the Devices First',
              items: [
                { id: 'b-11-1-1', text: 'Look at the home screen of their phone and tablet; every app icon is a potential account' },
                { id: 'b-11-1-2', text: 'Open the browser on their computer and check bookmarks and browser history' },
                { id: 'b-11-1-3', text: 'Check the browser\'s auto-fill suggestions; start typing common site names (amazon, facebook, bank) in the address bar and see what auto-completes' },
                { id: 'b-11-1-4', text: 'Look for browser saved passwords (see Section 11.10 for details on accessing these)' },
                { id: 'b-11-1-5', text: 'Check for authenticator apps (Google Authenticator, Authy, Microsoft Authenticator); these reveal which services had two-factor authentication enabled' },
                { id: 'b-11-1-6', text: 'Look at notification center and lock screen notifications for app alerts' },
                { id: 'b-11-1-7', text: 'Check the "recently used apps" view on their phone' }
              ]
            },
            {
              id: 'section-11-1-money',
              title: 'Follow the Money',
              items: [
                { id: 'b-11-1-8', text: 'Review 3 to 6 months of bank statements and credit card statements for recurring charges; every charge is a discovered account' },
                { id: 'b-11-1-9', text: 'Look for charges from Apple, Google, PayPal, Venmo, and other payment processors' },
                { id: 'b-11-1-10', text: 'Check for small verification charges (often $0.01 to $1.00) that indicate recently linked accounts' },
                { id: 'b-11-1-11', text: 'Request a deceased person\'s credit report from all three bureaus (Equifax, Experian, TransUnion); this reveals financial accounts, credit cards, and loans you may not know about' },
                { id: 'b-11-1-12', text: 'Check physical mail for statements, bills, and subscription renewal notices' }
              ]
            },
            {
              id: 'section-11-1-email',
              title: 'Search the Email',
              items: [
                { id: 'b-11-1-13', text: 'Search for "welcome to" or "verify your email" or "confirm your account" to find account creation messages' },
                { id: 'b-11-1-14', text: 'Search for "subscription," "receipt," "invoice," "payment," "renewal," and "billing"' },
                { id: 'b-11-1-15', text: 'Search for "password reset" or "forgot password" to find accounts they recovered in the past' },
                { id: 'b-11-1-16', text: 'Search for "two-factor" or "verification code" to find accounts with 2FA enabled' },
                { id: 'b-11-1-17', text: 'Search for the name of every major platform (Amazon, Netflix, Spotify, etc.)' },
                { id: 'b-11-1-18', text: 'Look at the spam/junk folder; marketing emails reveal accounts' },
                { id: 'b-11-1-19', text: 'Check email folders and labels the person created; these often reveal organizational habits around specific services' }
              ]
            },
            {
              id: 'section-11-1-physical',
              title: 'Physical Clues',
              items: [
                { id: 'b-11-1-20', text: 'Look for written notes, sticky notes near the computer, notebooks, or index cards with passwords or account names' },
                { id: 'b-11-1-21', text: 'Check for a physical safe, lockbox, or designated "important papers" location' },
                { id: 'b-11-1-22', text: 'Look for hardware security keys (YubiKey or similar small USB devices) on their keychain or near their computer' },
                { id: 'b-11-1-23', text: 'Check their wallet for loyalty cards, membership cards, and store credit cards' },
                { id: 'b-11-1-24', text: 'Look for printed password manager emergency kits or recovery sheets' }
              ]
            }
          ]
        },
        {
          id: 'section-11-2',
          title: '11.2 -- Email as the Skeleton Key',
          description: 'Almost every online account uses an email address for sign-up, password recovery, and notifications. If you can access the deceased\'s primary email, you can discover accounts, reset passwords, intercept two-factor codes sent via email, find financial notifications, and cancel subscriptions.',
          categories: [
            {
              id: 'section-11-2-email-access',
              title: 'Email as the Skeleton Key',
              items: [
                { id: 'b-11-2-1', text: 'If you already have access to their email (computer is unlocked, you know the password, or a browser session is still active), secure it immediately' },
                { id: 'b-11-2-2', text: 'Change the recovery phone number and backup email to yours if you are the legal executor' },
                { id: 'b-11-2-3', text: 'Do not delete anything' },
                { id: 'b-11-2-4', text: 'If you do not have access to their email, begin the platform-specific processes in Sections 11.3 through 11.5' }
              ]
            }
          ]
        },
        {
          id: 'section-11-3',
          title: '11.3 -- Google (Gmail, Drive, Photos, YouTube)',
          description: 'Google accounts are the most commonly used email platform and often hold Gmail, Google Drive documents, Google Photos, YouTube history, Google Pay records, and more.',
          categories: [
            {
              id: 'section-11-3-discovery',
              title: 'Discovery',
              items: [
                { id: 'b-11-3-1', text: 'Check if their phone is an Android device; it almost certainly has a Google account' },
                { id: 'b-11-3-2', text: 'Look for Gmail notifications or the Gmail app on any device' },
                { id: 'b-11-3-3', text: 'Check browser bookmarks and history for Google services' },
                { id: 'b-11-3-4', text: 'Search bank/credit card statements for "Google" charges (Google One storage, YouTube Premium, Google Play purchases)' }
              ]
            },
            {
              id: 'section-11-3-step1',
              title: 'Step 1: Submit the Deceased User Request Form',
              items: [
                { id: 'b-11-3-5', text: 'Go to Google\'s deceased user support page: support.google.com/accounts/troubleshooter/6357590' },
                { id: 'b-11-3-6', text: 'You will be asked what you want to do: obtain data from the account, request account closure, or report funds in Google Pay' }
              ]
            },
            {
              id: 'section-11-3-step2',
              title: 'Step 2: Gather Required Documentation',
              items: [
                { id: 'b-11-3-7', text: 'Your government-issued photo ID' },
                { id: 'b-11-3-8', text: 'The deceased person\'s death certificate' },
                { id: 'b-11-3-9', text: 'Proof of your legal authority to act on behalf of the deceased (executor letters, letters testamentary, or power of attorney)' },
                { id: 'b-11-3-10', text: 'If requesting data (not just closure): a U.S. court order specifically naming Google and the data requested. Google will provide template language for this court order after your initial request is reviewed.' }
              ]
            },
            {
              id: 'section-11-3-step3',
              title: 'Step 3: Submit and Wait',
              items: [
                { id: 'b-11-3-11', text: 'Google reviews each request individually. Initial review can take several weeks.' },
                { id: 'b-11-3-12', text: 'If approved for data access, Google will instruct you on how to obtain the required court order' },
                { id: 'b-11-3-13', text: 'After the court order is submitted, allow an additional 2 to 4 weeks for processing' },
                { id: 'b-11-3-14', text: 'Total timeline from initial request to data delivery: typically 1 to 4 months, sometimes longer' }
              ]
            },
            {
              id: 'section-11-3-workarounds',
              title: 'Practical Workarounds',
              items: [
                { id: 'b-11-3-15', text: 'If their computer has an active Chrome session signed into Google, you may be able to access Gmail, Drive, and Photos directly through the browser without needing the password' },
                { id: 'b-11-3-16', text: 'Check Chrome\'s saved passwords (chrome://settings/passwords) which may reveal the Google account password itself' },
                { id: 'b-11-3-17', text: 'If their Android phone is unlocked, Gmail and other Google apps are likely already signed in' },
                { id: 'b-11-3-18', text: 'If they used Google Chrome and synced passwords, accessing Chrome on any device where they were signed in gives you access to all their saved passwords for other sites' }
              ]
            }
          ]
        },
        {
          id: 'section-11-4',
          title: '11.4 -- Apple (iCloud, Device Access, Photos, Messages)',
          description: 'Apple accounts control iCloud storage (photos, documents, backups), Messages, FaceTime, App Store purchases, Apple Pay, and all Apple device activation locks.',
          categories: [
            {
              id: 'section-11-4-discovery',
              title: 'Discovery',
              items: [
                { id: 'b-11-4-1', text: 'Check if they owned any Apple device (iPhone, iPad, Mac, Apple Watch)' },
                { id: 'b-11-4-2', text: 'Look for the Apple ID email in device settings (Settings > [Name] at the top on iOS)' },
                { id: 'b-11-4-3', text: 'Check bank statements for "Apple" or "apple.com/bill" charges' },
                { id: 'b-11-4-4', text: 'Look for iCloud storage notification emails' }
              ]
            },
            {
              id: 'section-11-4-with-legacy',
              title: 'Access Without Credentials: With Legacy Contact',
              items: [
                { id: 'b-11-4-5', text: 'Go to digital-legacy.apple.com' },
                { id: 'b-11-4-6', text: 'You will need: your Legacy Contact access key (shared with you when you were designated) AND a certified copy of the death certificate' },
                { id: 'b-11-4-7', text: 'Apple verifies the documentation and creates a special "legacy contact Apple Account" for you to access the data' },
                { id: 'b-11-4-8', text: 'Processing time: typically 1 to 2 weeks after submission' },
                { id: 'b-11-4-9', text: 'You will have access for up to 3 years before the account is permanently deleted' }
              ]
            },
            {
              id: 'section-11-4-without-legacy',
              title: 'Access Without Credentials: Without Legacy Contact',
              items: [
                { id: 'b-11-4-10', text: 'Apple requires a court order naming you as the rightful inheritor of the deceased person\'s personal information stored in their Apple account' },
                { id: 'b-11-4-11', text: 'In the U.S., you will need: a death certificate, a court order (from a state or federal court with jurisdiction), and your government-issued ID' },
                { id: 'b-11-4-12', text: 'Submit the request through Apple Support or at an Apple Store' },
                { id: 'b-11-4-13', text: 'Apple reviews each request individually; processing can take several weeks to months' },
                { id: 'b-11-4-14', text: 'In some international jurisdictions (France, Germany, Japan, Australia, New Zealand), alternative documentation may be accepted instead of a court order' }
              ]
            },
            {
              id: 'section-11-4-device-access',
              title: 'Device Access (Locked iPhone, iPad, or Mac)',
              items: [
                { id: 'b-11-4-15', text: 'Apple cannot remove a device passcode without erasing the device' },
                { id: 'b-11-4-16', text: 'If the device is locked and you do not know the passcode, Apple cannot help you bypass it while preserving data' },
                { id: 'b-11-4-17', text: 'If the device is locked with Activation Lock (tied to Apple ID), Apple can remove the Activation Lock with proof of ownership and a death certificate, but this erases the device' },
                { id: 'b-11-4-18', text: 'If the device has Face ID or Touch ID, biometric authentication will not work after death (Face ID requires attention detection; fingerprint sensors degrade)' },
                { id: 'b-11-4-19', text: 'Check if they used a simple 4-digit or 6-digit passcode; try common personal numbers (birthdays, anniversaries, addresses)' },
                { id: 'b-11-4-20', text: 'If you can get into the device, check Settings > Passwords for all saved website and app passwords' },
                { id: 'b-11-4-21', text: 'If you can get into the device, check Settings > [Name] to see the Apple ID email, which may help with other account recovery' },
                { id: 'b-11-4-22', text: 'If the device is locked but you have iCloud access (through Legacy Contact or court order), you can retrieve iCloud backups which contain much of the device data' }
              ]
            }
          ]
        },
        {
          id: 'section-11-5',
          title: '11.5 -- Microsoft (Outlook, OneDrive, Xbox)',
          description: 'Microsoft accounts cover Outlook.com email (including @hotmail.com, @live.com, @msn.com), OneDrive file storage, Xbox gaming profiles, and Microsoft 365 subscriptions.',
          categories: [
            {
              id: 'section-11-5-discovery',
              title: 'Discovery',
              items: [
                { id: 'b-11-5-1', text: 'Check if they used a Windows PC (likely has a Microsoft account for sign-in)' },
                { id: 'b-11-5-2', text: 'Look for Outlook, Hotmail, or Live email addresses in their contacts or other account registrations' },
                { id: 'b-11-5-3', text: 'Check bank statements for Microsoft/Xbox charges' },
                { id: 'b-11-5-4', text: 'Look for Office 365 or Microsoft 365 subscription emails' }
              ]
            },
            {
              id: 'section-11-5-nextofkin',
              title: 'Access Without Credentials: Next of Kin Process',
              items: [
                { id: 'b-11-5-5', text: 'Contact Microsoft Support and request the Next of Kin process' },
                { id: 'b-11-5-6', text: 'Required documentation: a certified copy of the death certificate AND a document proving your legal relationship to the deceased as a "close relative" (spouse, parent, child, sibling, grandparent, or grandchild)' },
                { id: 'b-11-5-7', text: 'Microsoft may also require a court order or subpoena depending on the nature of the request and what data you are seeking' }
              ]
            },
            {
              id: 'section-11-5-timing',
              title: 'Important Timing Warning',
              items: [
                { id: 'b-11-5-8', text: 'Outlook.com and OneDrive data may be deleted after 1 year of inactivity' },
                { id: 'b-11-5-9', text: 'Microsoft accounts expire entirely after 2 years of inactivity' },
                { id: 'b-11-5-10', text: 'Submit your request promptly to avoid automatic data deletion' }
              ]
            },
            {
              id: 'section-11-5-workarounds',
              title: 'Practical Workarounds',
              items: [
                { id: 'b-11-5-11', text: 'If the Windows PC is logged in and not locked, you have immediate access to Outlook (desktop app), OneDrive files synced locally, and browser-saved passwords' },
                { id: 'b-11-5-12', text: 'On Windows, check for saved passwords in Edge (edge://settings/passwords) or Chrome' },
                { id: 'b-11-5-13', text: 'BitLocker recovery keys may be stored in the deceased\'s Microsoft account at aka.ms/myrecoverykey (if you can access the account through other means)' },
                { id: 'b-11-5-14', text: 'If the PC is locked with a Microsoft account password, and you have access to the associated email (through another method), you can attempt a password reset through account.live.com' }
              ]
            }
          ]
        },
        {
          id: 'section-11-6',
          title: '11.6 -- Facebook / Meta (With and Without Legacy Contact)',
          description: '',
          categories: [
            {
              id: 'section-11-6-discovery',
              title: 'Discovery',
              items: [
                { id: 'b-11-6-1', text: 'Search Facebook for their name; if they had a profile, it will appear in search results' },
                { id: 'b-11-6-2', text: 'Check their phone for the Facebook, Messenger, or Instagram apps' },
                { id: 'b-11-6-3', text: 'Search their email for Facebook notifications' },
                { id: 'b-11-6-4', text: 'Ask friends and family if they were connected on Facebook' }
              ]
            },
            {
              id: 'section-11-6-with-legacy',
              title: 'With a Legacy Contact Designated',
              items: [
                { id: 'b-11-6-5', text: 'The Legacy Contact can request memorialization of the account by submitting proof of death' },
                { id: 'b-11-6-6', text: 'Once memorialized, the Legacy Contact can: pin a tribute post, update the profile photo and cover photo, respond to new friend requests, and (if the deceased opted in) download a copy of the account data' },
                { id: 'b-11-6-7', text: 'The Legacy Contact does NOT need the deceased\'s password' }
              ]
            },
            {
              id: 'section-11-6-without-legacy',
              title: 'Without a Legacy Contact',
              items: [
                { id: 'b-11-6-8', text: 'Any verified immediate family member can request memorialization by submitting a memorialization request at facebook.com/help/contact/305593649477238' },
                { id: 'b-11-6-9', text: 'You will need to provide proof of death (obituary link, death certificate, or other documentation)' },
                { id: 'b-11-6-10', text: 'Alternatively, a verified immediate family member or legal representative can request permanent account deletion through a separate form' },
                { id: 'b-11-6-11', text: 'To request a copy of account data without a Legacy Contact, you may need a court order or a valid legal request' }
              ]
            },
            {
              id: 'section-11-6-workarounds',
              title: 'Practical Workarounds',
              items: [
                { id: 'b-11-6-12', text: 'If their phone is unlocked and the Facebook/Messenger app is still logged in, you can access messages, photos, and content directly before memorialization' },
                { id: 'b-11-6-13', text: 'Download any content you want to preserve BEFORE requesting memorialization, because once memorialized, the account cannot be logged into' },
                { id: 'b-11-6-14', text: 'If their email is accessible, check for Facebook notification emails that may contain message previews' },
                { id: 'b-11-6-15', text: 'If their browser has an active Facebook session, you can access the account through the browser' }
              ]
            }
          ],
          notes: [
            'Important: Do not rush to memorialize a Facebook account if you still need to access content through an active session on a device. Once memorialized, all active sessions are terminated and no one can sign in again.'
          ]
        },
        {
          id: 'section-11-7',
          title: '11.7 -- Financial Institutions (Banks, Credit Cards, Investments)',
          description: '',
          categories: [
            {
              id: 'section-11-7-warning',
              title: 'CRITICAL: Check Account Ownership Type BEFORE Notifying the Bank',
              items: [
                { id: 'b-11-7-1', text: 'Determine whether each account is jointly owned, solely owned, or has a payable-on-death (POD) / transfer-on-death (TOD) beneficiary designation' },
                { id: 'b-11-7-2', text: 'For joint accounts: the surviving owner retains full access. Notify the bank to remove the deceased\'s name, but funds remain available.' },
                { id: 'b-11-7-3', text: 'For sole accounts: notification will trigger a freeze. Ensure you have alternative funds available for immediate expenses before notifying.' },
                { id: 'b-11-7-4', text: 'For accounts with POD/TOD beneficiaries: these transfer directly to the named beneficiary outside of probate, but the bank still needs the death certificate to process the transfer.' },
                { id: 'b-11-7-5', text: 'If you are unsure of the account type, consult with an estate attorney before notifying the bank.' }
              ],
              warnings: [
                'When a bank learns that an account holder has died, they will typically freeze the sole-owned accounts. This means no withdrawals, no bill payments, no autopay. If the surviving family depends on funds in those accounts for mortgage payments, utilities, or daily expenses, a freeze can cause immediate financial hardship.'
              ]
            },
            {
              id: 'section-11-7-discovery',
              title: 'Discovery of Financial Accounts',
              items: [
                { id: 'b-11-7-6', text: 'Review all bank and credit card statements available (paper and electronic)' },
                { id: 'b-11-7-7', text: 'Search email for bank names, "statement available," "account alert," and "direct deposit"' },
                { id: 'b-11-7-8', text: 'Request a deceased person\'s credit report from all three bureaus; this is the most comprehensive way to find unknown accounts, credit cards, and loans' },
                { id: 'b-11-7-9', text: 'Check physical mail over the next 2 to 3 months for statements and tax documents' },
                { id: 'b-11-7-10', text: 'Look for tax returns (prior year Form 1040 and supporting schedules) which list interest income, dividend income, and capital gains; each of these points to a financial account' },
                { id: 'b-11-7-11', text: 'Check for safe deposit boxes at local banks (these may require a court order to access)' },
                { id: 'b-11-7-12', text: 'Review the deceased\'s insurance policies, which may reference financial institutions' }
              ]
            },
            {
              id: 'section-11-7-access',
              title: 'Access Process for Sole Accounts',
              items: [
                { id: 'b-11-7-13', text: 'Contact the bank\'s dedicated estate or bereavement department (most large banks have one)' },
                { id: 'b-11-7-14', text: 'Required documentation typically includes: certified death certificate, letters testamentary or letters of administration from probate court, your government-issued ID, and possibly an EIN (Employer Identification Number) for the estate' },
                { id: 'b-11-7-15', text: 'The bank will guide you through their specific process for transferring or distributing funds' },
                { id: 'b-11-7-16', text: 'Investment and brokerage accounts (Fidelity, Schwab, Vanguard, etc.) have similar processes but may also require a completed transfer form specific to each firm' }
              ]
            }
          ]
        },
        {
          id: 'section-11-8',
          title: '11.8 -- Phone Carriers (Getting the Phone Number for 2FA)',
          description: 'Maintaining control of the deceased\'s phone number is critically important. Many accounts use SMS-based two-factor authentication, and if the phone number is disconnected or reassigned, you lose the ability to receive verification codes needed to access those accounts.',
          categories: [
            {
              id: 'section-11-8-why',
              title: 'Why This Matters',
              items: [
                { id: 'b-11-8-1', text: 'SMS verification codes are used by banks, email providers, social media, and many other services' },
                { id: 'b-11-8-2', text: 'If the phone number is canceled, a new person may eventually be assigned that number, creating both a privacy risk and a loss of account recovery capability' },
                { id: 'b-11-8-3', text: 'Some carriers will cancel the line after a period of non-payment, so act promptly' }
              ]
            },
            {
              id: 'section-11-8-verizon',
              title: 'Verizon (800-922-0204)',
              items: [
                { id: 'b-11-8-4', text: 'An estate executor can transfer the line to a new or different Verizon account' },
                { id: 'b-11-8-5', text: 'Complete the Executor transfer or disconnect service form (available on verizon.com/support)' },
                { id: 'b-11-8-6', text: 'Documentation: death certificate, executor documentation' },
                { id: 'b-11-8-7', text: 'Typical processing time: approximately 3 business days' }
              ]
            },
            {
              id: 'section-11-8-att',
              title: 'AT&T (800-331-0500)',
              items: [
                { id: 'b-11-8-8', text: 'Complete a Transfer of Billing Responsibility form to move the line to your account' },
                { id: 'b-11-8-9', text: 'Any past-due balance must be paid before the line can be transferred' },
                { id: 'b-11-8-10', text: 'Device installment plans transfer with the line' },
                { id: 'b-11-8-11', text: 'Documentation: death certificate, proof of relationship or executor status' }
              ]
            },
            {
              id: 'section-11-8-tmobile',
              title: 'T-Mobile (877-746-0909)',
              items: [
                { id: 'b-11-8-12', text: 'Call customer service to transfer or cancel the line' },
                { id: 'b-11-8-13', text: 'Documentation: death certificate, and the deceased\'s Social Security number if available' },
                { id: 'b-11-8-14', text: 'T-Mobile\'s requirements are generally less strict than Verizon or AT&T' }
              ]
            },
            {
              id: 'section-11-8-other',
              title: 'Other Carriers / MVNOs',
              items: [
                { id: 'b-11-8-15', text: 'Contact customer service directly; most prepaid and smaller carriers have informal processes' },
                { id: 'b-11-8-16', text: 'Have the death certificate, your ID, and any account information you can find (account number, PIN, last four of SSN)' }
              ]
            },
            {
              id: 'section-11-8-workarounds',
              title: 'Practical Workarounds',
              items: [
                { id: 'b-11-8-17', text: 'If the phone is unlocked and the SIM is active, you can receive 2FA codes directly on the device' },
                { id: 'b-11-8-18', text: 'If the phone is locked, move the SIM card to another compatible phone to keep receiving SMS codes while you work through account recovery' },
                { id: 'b-11-8-19', text: 'Some phones allow you to see incoming SMS on the lock screen even without unlocking; check notification settings' },
                { id: 'b-11-8-20', text: 'If the phone uses eSIM (newer iPhones and Android devices), contact the carrier about transferring the eSIM to a new device' }
              ]
            }
          ]
        },
        {
          id: 'section-11-9',
          title: '11.9 -- Password Managers (When You Do Not Have the Master Password)',
          description: 'If the deceased used a password manager but you do not have the master password, your options are limited by design. Password managers are built specifically so that no one, including the company that makes them, can access the vault without the master password.',
          categories: [
            {
              id: 'section-11-9-determine',
              title: 'Determine Which Password Manager Was Used',
              items: [
                { id: 'b-11-9-1', text: 'Look for password manager apps on their phone or computer (1Password, Bitwarden, Dashlane, LastPass, Keeper, etc.)' },
                { id: 'b-11-9-2', text: 'Check browser extensions; password managers typically install browser extensions that are visible in the browser toolbar' },
                { id: 'b-11-9-3', text: 'Search email for "welcome to 1Password" or "Bitwarden" or similar account creation confirmations' }
              ]
            },
            {
              id: 'section-11-9-1password',
              title: '1Password Recovery',
              items: [
                { id: 'b-11-9-4', text: 'If they used a 1Password Family or Teams plan, the family organizer or team admin can perform account recovery for members' },
                { id: 'b-11-9-5', text: 'Look for a printed "Emergency Kit" (a PDF that 1Password generates containing the Secret Key and space to write the master password). Check the physical safe, filing cabinets, and anywhere they kept important papers.' },
                { id: 'b-11-9-6', text: 'Without the Emergency Kit or family/team admin access, the vault is unrecoverable' }
              ]
            },
            {
              id: 'section-11-9-bitwarden',
              title: 'Bitwarden Recovery',
              items: [
                { id: 'b-11-9-7', text: 'If they used Bitwarden\'s Emergency Access feature and designated you as a trusted contact, you can request access. After the designated waiting period (set by the account holder, typically 1 to 30 days), access is granted automatically.' },
                { id: 'b-11-9-8', text: 'If they used a Bitwarden Organization account, an admin can reset the master password for organization members' },
                { id: 'b-11-9-9', text: 'Without Emergency Access or org admin, the vault is unrecoverable. Bitwarden explicitly states they cannot retrieve or reset a lost master password.' }
              ]
            },
            {
              id: 'section-11-9-lastpass',
              title: 'LastPass Recovery',
              items: [
                { id: 'b-11-9-10', text: 'If they set up Emergency Access and designated you, you can request access through LastPass' },
                { id: 'b-11-9-11', text: 'LastPass also supports account recovery via SMS or email for the account holder, but this requires access to their phone or email' },
                { id: 'b-11-9-12', text: 'Without Emergency Access, the vault is unrecoverable' }
              ]
            },
            {
              id: 'section-11-9-dashlane',
              title: 'Dashlane Recovery',
              items: [
                { id: 'b-11-9-13', text: 'If they designated an Emergency Contact, you can request access' },
                { id: 'b-11-9-14', text: 'Dashlane supports biometric recovery on trusted devices; if you can access their phone with their biometric profile still active, you may be able to unlock Dashlane via fingerprint or face on that device (though biometric data degrades rapidly after death)' },
                { id: 'b-11-9-15', text: 'Without Emergency Contact designation, the vault is unrecoverable' }
              ]
            },
            {
              id: 'section-11-9-keeper',
              title: 'Keeper Recovery',
              items: [
                { id: 'b-11-9-16', text: 'Keeper offers an Emergency Access (Digital Legacy) feature' },
                { id: 'b-11-9-17', text: 'Without it being configured, the vault is unrecoverable' }
              ]
            },
            {
              id: 'section-11-9-workarounds',
              title: 'Practical Workarounds',
              items: [
                { id: 'b-11-9-18', text: 'Check if the password manager app is still signed in on any device (phone, computer); password managers often stay unlocked for a configurable period' },
                { id: 'b-11-9-19', text: 'Check if their browser has separately saved passwords outside the password manager (browsers save passwords independently)' },
                { id: 'b-11-9-20', text: 'Look for the master password written down somewhere physical; many people write it on a sticky note, in a notebook, or on the emergency kit printout' },
                { id: 'b-11-9-21', text: 'If they used a simple or personally meaningful master password, and you knew them well, it may be worth trying common personal patterns (this is legitimate when you are the legal executor)' }
              ]
            }
          ],
          notes: [
            'The Hard Truth: If no emergency access was configured and you do not have the master password or recovery kit, the vault contents are permanently inaccessible. This is by design. The password manager company cannot help you. There is no backdoor, no court order process, no override. You will need to recover each account individually using other methods (email-based password resets, platform-specific deceased user processes, etc.).'
          ]
        },
        {
          id: 'section-11-10',
          title: '11.10 -- Devices (Locked Phones, Laptops, Encrypted Drives)',
          description: '',
          categories: [
            {
              id: 'section-11-10-unlocked',
              title: 'Unlocked Devices: Act Fast',
              items: [
                { id: 'b-11-10-1', text: 'Disable auto-lock on the device (prevent it from locking itself)' },
                { id: 'b-11-10-2', text: 'On iPhone/iPad: Settings > Display & Brightness > Auto-Lock > Never' },
                { id: 'b-11-10-3', text: 'On Android: Settings > Display > Screen timeout > maximum value or "Never"' },
                { id: 'b-11-10-4', text: 'On Mac: System Settings > Lock Screen > set to Never (or maximum)' },
                { id: 'b-11-10-5', text: 'On Windows: Settings > System > Power > Screen and Sleep > Never' },
                { id: 'b-11-10-6', text: 'Check browser saved passwords: Chrome (Settings > Passwords or chrome://settings/passwords), Safari (Settings > Passwords on Mac or iOS), Firefox (Settings > Privacy & Security > Saved Logins), Edge (Settings > Passwords or edge://settings/passwords)' },
                { id: 'b-11-10-7', text: 'Check the device\'s native password/keychain system: iPhone/iPad (Settings > Passwords), Mac (System Settings > Passwords or Keychain Access), Windows (Control Panel > Credential Manager)' },
                { id: 'b-11-10-8', text: 'Export or photograph the saved passwords before the device locks or runs out of battery' },
                { id: 'b-11-10-9', text: 'Check for authenticator apps and photograph the current TOTP codes and account names' }
              ]
            },
            {
              id: 'section-11-10-locked-mac',
              title: 'Locked Mac (FileVault)',
              items: [
                { id: 'b-11-10-10', text: 'If FileVault is enabled and you do not have the password, the drive is encrypted and inaccessible without either the user password or the FileVault recovery key' },
                { id: 'b-11-10-11', text: 'The FileVault recovery key may have been escrowed to the Apple ID; if you can access the Apple account (through Legacy Contact or court order), you may be able to retrieve the recovery key' },
                { id: 'b-11-10-12', text: 'If FileVault was NOT enabled, you can reset the Mac\'s user password by booting into Recovery Mode (Command+R on Intel Macs, hold power button on Apple Silicon) and using the Reset Password utility. This does NOT decrypt a FileVault-protected drive.' }
              ]
            },
            {
              id: 'section-11-10-locked-windows',
              title: 'Locked Windows PC (BitLocker)',
              items: [
                { id: 'b-11-10-13', text: 'If BitLocker is enabled and tied to a Microsoft account, the recovery key may be stored at aka.ms/myrecoverykey; you need Microsoft account access to retrieve it' },
                { id: 'b-11-10-14', text: 'If BitLocker is enabled through a work or school account, contact their employer\'s IT department' },
                { id: 'b-11-10-15', text: 'If BitLocker is not enabled, you may be able to reset the Windows password using a Windows installation USB or a password reset tool' },
                { id: 'b-11-10-16', text: 'Check for a printed BitLocker recovery key in their physical files' }
              ]
            },
            {
              id: 'section-11-10-encrypted',
              title: 'Encrypted External Drives',
              items: [
                { id: 'b-11-10-17', text: 'Drives encrypted with BitLocker, FileVault, VeraCrypt, or similar tools require the encryption password or recovery key' },
                { id: 'b-11-10-18', text: 'Without the password or key, the data is effectively unrecoverable with current technology' },
                { id: 'b-11-10-19', text: 'A professional data recovery service cannot bypass encryption; they can only recover data from physically damaged but unencrypted drives' }
              ]
            }
          ]
        },
        {
          id: 'section-11-11',
          title: '11.11 -- Cryptocurrency (The Hard Truth)',
          description: 'Cryptocurrency is fundamentally different from every other type of digital asset covered in this guide. There is no company behind Bitcoin, Ethereum, or most other cryptocurrencies. There is no customer service number. There is no court order process. There is no reset password button.',
          categories: [
            {
              id: 'section-11-11-exchange',
              title: 'Scenario A: Cryptocurrency on an Exchange (Coinbase, Kraken, Gemini, etc.)',
              items: [
                { id: 'b-11-11-1', text: 'Determine which exchange(s) were used by checking email for account confirmations, checking bank statements for transfers to exchanges, and looking for exchange apps on their phone' },
                { id: 'b-11-11-2', text: 'Contact the exchange\'s estate or bereavement department' },
                { id: 'b-11-11-3', text: 'Required documentation typically includes: death certificate, probate court documentation naming the executor or administrator, government-issued ID, and proof that the deceased held an account' },
                { id: 'b-11-11-4', text: 'Coinbase, Kraken, and Gemini each have estate claim processes; none currently offer in-platform beneficiary designations' },
                { id: 'b-11-11-5', text: 'After the claim is processed, assets are typically transferred to the beneficiary\'s own account on the same exchange' },
                { id: 'b-11-11-6', text: 'Timeline: 4 to 12 weeks depending on the exchange and complexity' }
              ]
            },
            {
              id: 'section-11-11-selfcustody',
              title: 'Scenario B: Cryptocurrency in a Self-Custody Wallet (No Exchange)',
              items: [
                { id: 'b-11-11-7', text: 'Search thoroughly for the seed phrase. Check: physical safes, safety deposit boxes, filing cabinets, notebooks, envelopes with attorneys, anywhere they kept important documents. Some people engrave seed phrases on metal plates.' },
                { id: 'b-11-11-8', text: 'Search for the hardware wallet device itself (Ledger and Trezor are small USB-like devices). If you find the device AND know the PIN, you can access the funds.' },
                { id: 'b-11-11-9', text: 'If you find the device but do not know the PIN, some hardware wallets allow a limited number of PIN attempts before wiping. Proceed with extreme caution.' },
                { id: 'b-11-11-10', text: 'Search digital files for seed phrases (despite security advice against it, some people do store them in text files, notes apps, or photos of handwritten phrases)' },
                { id: 'b-11-11-11', text: 'Check password managers and browser-saved passwords for exchange accounts or wallet passwords' }
              ]
            }
          ],
          notes: [
            'What is Honestly Unrecoverable: If the deceased held cryptocurrency in a self-custody wallet and there is no seed phrase written down anywhere, no hardware wallet device or the device PIN is unknown and it has wiped after failed attempts, no backup file on any device, and no one else was given any access information -- then the cryptocurrency is, in practical terms, gone. No technology exists to reverse-engineer a seed phrase from a wallet address. No court order can compel a blockchain to release funds. An estimated 20% of all Bitcoin in existence is considered permanently lost due to exactly this scenario.'
          ]
        },
        {
          id: 'section-11-13',
          title: '11.13 -- Recommended Order of Operations for Path B',
          description: 'When you are starting from zero with no plan, no passwords, and no list of accounts, work through these steps in roughly this order. Some can be done in parallel; the numbering reflects priority, not strict sequence.',
          categories: [
            {
              id: 'section-11-13-phase1',
              title: 'Phase 1: Secure and Preserve (Day 1 to 3)',
              items: [
                { id: 'b-11-13-1', text: 'Charge and secure all devices. Do not reset, wipe, or update anything.' },
                { id: 'b-11-13-2', text: 'If any device is unlocked, disable auto-lock immediately and check for saved passwords in browsers and the device keychain.' },
                { id: 'b-11-13-3', text: 'If the phone is locked, move the SIM to a phone you control or keep the phone charged and accessible for incoming 2FA codes.' },
                { id: 'b-11-13-4', text: 'Photograph or write down everything you find: saved passwords, authenticator app entries, auto-complete suggestions, app icons on the phone.' }
              ]
            },
            {
              id: 'section-11-13-phase2',
              title: 'Phase 2: Get Into Email (Day 1 to 7)',
              items: [
                { id: 'b-11-13-5', text: 'Check if email is already accessible through an open browser session on any device.' },
                { id: 'b-11-13-6', text: 'If the computer is unlocked, check browser saved passwords for their email provider.' },
                { id: 'b-11-13-7', text: 'If you cannot access email through a device, begin the formal request process with the email provider (Google, Apple, Microsoft; see Sections 11.3 through 11.5).' },
                { id: 'b-11-13-8', text: 'If they had multiple email addresses, getting into any one of them may lead you to the others through account recovery emails.' }
              ]
            },
            {
              id: 'section-11-13-phase3',
              title: 'Phase 3: Stabilize Finances and Phone (Week 1 to 2)',
              items: [
                { id: 'b-11-13-9', text: 'Determine account ownership types (joint vs. sole) for all financial accounts BEFORE notifying banks.' },
                { id: 'b-11-13-10', text: 'Contact the phone carrier to transfer the phone number to your account.' },
                { id: 'b-11-13-11', text: 'Cancel non-essential subscriptions that are draining funds.' },
                { id: 'b-11-13-12', text: 'Identify which autopay items are critical to maintain (mortgage, utilities, insurance).' }
              ]
            },
            {
              id: 'section-11-13-phase4',
              title: 'Phase 4: Discover Accounts (Week 2 to 4)',
              items: [
                { id: 'b-11-13-13', text: 'Search email for account registration messages, receipts, and password reset emails.' },
                { id: 'b-11-13-14', text: 'Review 3 to 6 months of bank and credit card statements for all recurring charges.' },
                { id: 'b-11-13-15', text: 'Request a deceased person\'s credit report from all three bureaus.' },
                { id: 'b-11-13-16', text: 'Build a master spreadsheet of every discovered account with: service name, email used, status (accessible/locked/unknown), and action needed.' }
              ]
            },
            {
              id: 'section-11-13-phase5',
              title: 'Phase 5: Systematic Account Recovery (Month 1 to 6)',
              items: [
                { id: 'b-11-13-17', text: 'For each discovered account, attempt password reset via email first (this is why email access is priority one).' },
                { id: 'b-11-13-18', text: 'For accounts requiring formal processes, begin those requests in parallel; they take weeks to months.' },
                { id: 'b-11-13-19', text: 'Download and preserve data from any account you can access before closing or memorializing it.' },
                { id: 'b-11-13-20', text: 'Keep a log of every call made, ticket number received, document submitted, and date. You will need this for estate settlement and in case requests are lost or denied.' }
              ]
            },
            {
              id: 'section-11-13-phase6',
              title: 'Phase 6: Protect and Close (Ongoing)',
              items: [
                { id: 'b-11-13-21', text: 'File identity theft protections with credit bureaus, SSA, IRS, and DMV (see Section 8.1).' },
                { id: 'b-11-13-22', text: 'Close or memorialize social media accounts after preserving desired content.' },
                { id: 'b-11-13-23', text: 'Close unnecessary accounts to reduce ongoing identity theft risk.' },
                { id: 'b-11-13-24', text: 'Continue monitoring credit reports for at least 2 years.' }
              ]
            }
          ]
        }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // Platform-specific legacy access setup (from Sections 3 and 11)
  // ---------------------------------------------------------------------------

  const PLATFORMS = {
    google: {
      id: 'google',
      name: 'Google',
      services: 'Gmail, Drive, Photos, YouTube',
      featureName: 'Inactive Account Manager',
      settingsUrl: 'https://myaccount.google.com/inactive',
      hasLegacyTool: true,
      planningSteps: [
        { id: 'google-plan-1', text: 'Go to Google Inactive Account Manager', link: 'https://myaccount.google.com/inactive' },
        { id: 'google-plan-2', text: 'Choose an inactivity timeout period (3, 6, 12, or 18 months)' },
        { id: 'google-plan-3', text: 'Add up to 10 trusted contacts to notify and/or share data with' },
        { id: 'google-plan-4', text: 'Choose which data types each contact receives' },
        { id: 'google-plan-5', text: 'Decide whether to auto-delete the account after contacts are notified' }
      ],
      recoverySteps: [
        { id: 'google-recover-1', text: 'Go to Google\'s deceased user support page', link: 'https://support.google.com/accounts/troubleshooter/6357590' },
        { id: 'google-recover-2', text: 'Choose what you want to do: obtain data from the account, request account closure, or report funds in Google Pay' },
        { id: 'google-recover-3', text: 'Gather required documentation: your government-issued photo ID, the death certificate, and proof of legal authority' },
        { id: 'google-recover-4', text: 'If requesting data: you will need a U.S. court order specifically naming Google and the data requested' },
        { id: 'google-recover-5', text: 'Submit and wait for individual review (initial review: several weeks)' },
        { id: 'google-recover-6', text: 'If approved, obtain the required court order and submit it' },
        { id: 'google-recover-7', text: 'Allow an additional 2 to 4 weeks for processing after court order submission' }
      ],
      tips: [
        'If you have a YouTube channel with subscribers or revenue, this is especially important',
        'If their computer has an active Chrome session signed into Google, you may be able to access Gmail, Drive, and Photos directly through the browser',
        'Check Chrome\'s saved passwords (chrome://settings/passwords) which may reveal the Google account password',
        'If they used Google Chrome and synced passwords, accessing Chrome on any device where they were signed in gives you access to all their saved passwords for other sites'
      ],
      warnings: [
        'Google will never provide the account password',
        'You cannot sign in and use the account; you receive data exports only',
        'This is a slow, formal process -- total timeline is typically 1 to 4 months'
      ],
      whatYouGet: [
        'Copies of data from specified Google services (Gmail messages, Drive files, Photos, etc.)',
        'Data is typically delivered as a downloadable export, similar to Google Takeout',
        'Account closure if requested'
      ],
      whatYouDontGet: [
        'The account password (Google will never provide this)',
        'Login access to the account (you cannot sign in and use it)',
        'Any data from services you did not specifically request in the court order',
        'Instant access; this is a slow, formal process'
      ],
      documentsNeeded: [
        'Government-issued photo ID',
        'Death certificate',
        'Proof of legal authority (executor letters, letters testamentary, or power of attorney)',
        'U.S. court order specifically naming Google and the data requested (for data access)'
      ],
      timeEstimate: '1 to 4 months total',
      timeline: [
        { action: 'Initial request submission and review', duration: '2 to 6 weeks' },
        { action: 'Court order preparation (your attorney)', duration: '2 to 4 weeks' },
        { action: 'Google processing after court order', duration: '2 to 4 weeks' },
        { action: 'Total from start to data delivery', duration: '1 to 4 months' }
      ]
    },

    apple: {
      id: 'apple',
      name: 'Apple',
      services: 'iCloud, Photos, Messages, Device Access',
      featureName: 'Legacy Contact',
      settingsUrl: null,
      settingsPath: 'Settings > [Your Name] > Sign-In & Security > Legacy Contact (iOS 15.2+)',
      hasLegacyTool: true,
      planningSteps: [
        { id: 'apple-plan-1', text: 'Set up Apple Legacy Contacts in Settings > [Your Name] > Sign-In & Security > Legacy Contact (iOS 15.2+)' },
        { id: 'apple-plan-2', text: 'Add up to 5 Legacy Contacts' },
        { id: 'apple-plan-3', text: 'Share the generated access key with each contact (print it, AirDrop it, or save it in Messages)' }
      ],
      recoverySteps: [
        { id: 'apple-recover-1', text: 'If you were designated as a Legacy Contact, go to digital-legacy.apple.com', link: 'https://digital-legacy.apple.com' },
        { id: 'apple-recover-2', text: 'Provide your Legacy Contact access key AND a certified copy of the death certificate' },
        { id: 'apple-recover-3', text: 'Apple verifies the documentation and creates a special "legacy contact Apple Account" for data access' },
        { id: 'apple-recover-4', text: 'If no Legacy Contact was set up: Apple requires a court order naming you as the rightful inheritor' },
        { id: 'apple-recover-5', text: 'In the U.S., gather: a death certificate, a court order, and your government-issued ID' },
        { id: 'apple-recover-6', text: 'Submit the request through Apple Support or at an Apple Store' }
      ],
      tips: [
        'Legacy Contacts will need the access key AND a death certificate',
        'Legacy Contacts cannot access Keychain passwords, payment info, or licensed media',
        'Apple will permanently delete the account 3 years after Legacy Contact access is granted',
        'If the device is still unlocked or has a short auto-lock timer, access it immediately and disable auto-lock',
        'Check Settings > Passwords on the device for all saved website and app passwords'
      ],
      warnings: [
        'Apple cannot remove a device passcode without erasing the device',
        'If the device is locked and you do not know the passcode, Apple cannot help you bypass it while preserving data',
        'Biometric authentication will not work after death',
        'After 10 failed passcode attempts, the phone may erase itself if that setting was enabled'
      ],
      whatYouGet: [
        'Photos and videos stored in iCloud',
        'Messages (if backed up to iCloud)',
        'Notes, files in iCloud Drive',
        'Device backups stored in iCloud',
        'Contacts, calendar, reminders',
        'Health data, Safari bookmarks'
      ],
      whatYouDontGet: [
        'Passwords stored in iCloud Keychain (this is explicitly excluded)',
        'Payment information (Apple Pay, stored credit cards)',
        'Licensed media (purchased music, movies, books, apps)',
        'Subscriptions or the ability to transfer them',
        'The account password itself'
      ],
      documentsNeeded: [
        'Legacy Contact access key (if designated)',
        'Certified death certificate',
        'Court order (if no Legacy Contact was set up)',
        'Government-issued ID'
      ],
      timeEstimate: '1 to 3 months (without Legacy Contact)',
      timeline: [
        { action: 'Legacy Contact request', duration: '1 to 2 weeks' },
        { action: 'Court order preparation', duration: '2 to 6 weeks' },
        { action: 'Apple processing (court order path)', duration: '2 to 8 weeks' },
        { action: 'Activation Lock removal', duration: '1 to 2 weeks after documentation submitted' }
      ]
    },

    facebook: {
      id: 'facebook',
      name: 'Facebook / Meta',
      services: 'Facebook, Messenger',
      featureName: 'Legacy Contact',
      settingsUrl: null,
      settingsPath: 'Settings > Accounts Center > Personal Details > Account Ownership and Control > Memorialization',
      hasLegacyTool: true,
      planningSteps: [
        { id: 'facebook-plan-1', text: 'Set up a Legacy Contact in Settings > Accounts Center > Personal Details > Account Ownership and Control > Memorialization' },
        { id: 'facebook-plan-2', text: 'Choose whether the Legacy Contact can download a copy of your data' },
        { id: 'facebook-plan-3', text: 'Alternatively, choose to have your account permanently deleted after death' }
      ],
      recoverySteps: [
        { id: 'facebook-recover-1', text: 'If a Legacy Contact was designated, the Legacy Contact can request memorialization by submitting proof of death' },
        { id: 'facebook-recover-2', text: 'Without a Legacy Contact, submit a memorialization request', link: 'https://www.facebook.com/help/contact/305593649477238' },
        { id: 'facebook-recover-3', text: 'Provide proof of death (obituary link, death certificate, or other documentation)' },
        { id: 'facebook-recover-4', text: 'Alternatively, request permanent account deletion through a separate form' },
        { id: 'facebook-recover-5', text: 'To request a copy of account data without a Legacy Contact, you may need a court order or valid legal request' }
      ],
      tips: [
        'Legacy Contacts can pin a tribute post, change profile/cover photo, and accept friend requests',
        'If their phone is unlocked and the Facebook/Messenger app is still logged in, you can access content directly before memorialization',
        'Download any content you want to preserve BEFORE requesting memorialization -- once memorialized, the account cannot be logged into',
        'Do not rush to memorialize if you still need to access content through an active session on a device'
      ],
      warnings: [
        'Legacy Contacts cannot read messages, remove content, or log in as you',
        'Login access to a memorialized account is impossible; no one can sign in',
        'Access to private messages (Messenger content) is explicitly excluded even for Legacy Contacts',
        'Once memorialized, all active sessions are terminated and no one can sign in again'
      ],
      whatYouGet: [
        'Memorialization of the profile (adds "Remembering" before the name)',
        'Download of account data (if Legacy Contact was granted this permission, or via legal process)',
        'The downloaded data includes posts, photos, videos, and profile information'
      ],
      whatYouDontGet: [
        'Login access to the account; no one can sign into a memorialized account',
        'Access to private messages (Messenger content); this is explicitly excluded even for Legacy Contacts',
        'The ability to remove existing content, posts, or photos from the memorialized profile',
        'The ability to remove existing friends'
      ],
      documentsNeeded: [
        'Proof of death (obituary link, death certificate, or other documentation)',
        'Court order or valid legal request (for data access without Legacy Contact)'
      ],
      timeEstimate: '1 to 4 weeks for memorialization',
      timeline: [
        { action: 'Memorialization with Legacy Contact', duration: '1 to 2 weeks' },
        { action: 'Memorialization without Legacy Contact', duration: '1 to 4 weeks' },
        { action: 'Data download request (legal process)', duration: 'Varies' }
      ]
    },

    microsoft: {
      id: 'microsoft',
      name: 'Microsoft',
      services: 'Outlook, OneDrive, Xbox',
      featureName: 'Next of Kin Process',
      settingsUrl: null,
      hasLegacyTool: false,
      planningSteps: [
        { id: 'microsoft-plan-1', text: 'Microsoft\'s "Next of Kin" process allows limited data access with a court order, death certificate, and proof of relationship' },
        { id: 'microsoft-plan-2', text: 'Be aware that accounts auto-close after 2 years of inactivity' }
      ],
      recoverySteps: [
        { id: 'microsoft-recover-1', text: 'Contact Microsoft Support and request the Next of Kin process' },
        { id: 'microsoft-recover-2', text: 'Provide a certified copy of the death certificate' },
        { id: 'microsoft-recover-3', text: 'Provide a document proving your legal relationship to the deceased as a "close relative" (spouse, parent, child, sibling, grandparent, or grandchild)' },
        { id: 'microsoft-recover-4', text: 'Microsoft may also require a court order or subpoena depending on the nature of the request' }
      ],
      tips: [
        'Microsoft\'s policies are among the more restrictive -- plan accordingly',
        'If the Windows PC is logged in and not locked, you have immediate access to Outlook, OneDrive files synced locally, and browser-saved passwords',
        'Check for saved passwords in Edge (edge://settings/passwords) or Chrome on Windows',
        'BitLocker recovery keys may be stored at aka.ms/myrecoverykey',
        'If the PC is locked with a Microsoft account password and you have access to the email, try a password reset through account.live.com'
      ],
      warnings: [
        'Outlook.com and OneDrive data may be deleted after 1 year of inactivity',
        'Microsoft accounts expire entirely after 2 years of inactivity',
        'Submit your request promptly to avoid automatic data deletion',
        'Data is delivered on a physical DVD shipped to your address (not as an online download)'
      ],
      whatYouGet: [
        'Outlook.com email contents (all emails and attachments)',
        'Address book and contact list',
        'Data is delivered on a physical DVD shipped to your address'
      ],
      whatYouDontGet: [
        'The account password or the ability to sign into the account',
        'Account ownership transfer',
        'OneDrive files may require a separate court order',
        'Xbox digital purchases are non-transferable',
        'Access to any Microsoft 365 subscription content'
      ],
      documentsNeeded: [
        'Certified death certificate',
        'Document proving legal relationship to the deceased',
        'Court order or subpoena (may be required depending on request)'
      ],
      timeEstimate: '4 to 10 weeks',
      timeline: [
        { action: 'Next of Kin request submission', duration: 'Same day' },
        { action: 'Microsoft review and processing', duration: '4 to 8 weeks' },
        { action: 'DVD delivery after approval', duration: '1 to 2 additional weeks' },
        { action: 'Court order path (if required)', duration: 'Add 2 to 6 weeks for legal preparation' }
      ]
    },

    instagram: {
      id: 'instagram',
      name: 'Instagram',
      services: 'Instagram',
      featureName: null,
      settingsUrl: null,
      hasLegacyTool: false,
      planningSteps: [
        { id: 'instagram-plan-1', text: 'Currently no legacy contact feature -- account can only be memorialized or deleted by a verified family member after death' },
        { id: 'instagram-plan-2', text: 'Consider downloading your data periodically (Settings > Your Activity > Download Your Information) and storing it locally' }
      ],
      recoverySteps: [
        { id: 'instagram-recover-1', text: 'A verified immediate family member can request memorialization or account deletion' },
        { id: 'instagram-recover-2', text: 'No formal legacy contact or management feature exists' }
      ],
      tips: [],
      warnings: [
        'No legacy contact or management feature available',
        'Can only memorialize or delete; no management possible'
      ],
      whatYouGet: [
        'Memorialization or deletion of the account'
      ],
      whatYouDontGet: [
        'Account management or login access',
        'Data download (without legal process)'
      ],
      documentsNeeded: [
        'Proof of identity as a verified family member',
        'Death certificate or other proof of death'
      ],
      timeEstimate: 'Varies',
      timeline: []
    },

    twitter: {
      id: 'twitter',
      name: 'X (Twitter)',
      services: 'X (Twitter)',
      featureName: null,
      settingsUrl: null,
      hasLegacyTool: false,
      planningSteps: [
        { id: 'twitter-plan-1', text: 'Currently no legacy contact or memorialization feature' },
        { id: 'twitter-plan-2', text: 'A verified family member or estate representative can request deactivation with documentation' },
        { id: 'twitter-plan-3', text: 'Account may auto-delete after extended inactivity' }
      ],
      recoverySteps: [
        { id: 'twitter-recover-1', text: 'A verified family member or estate representative can request deactivation with documentation' }
      ],
      tips: [],
      warnings: [
        'No legacy contact or memorialization feature available',
        'Can request deactivation with documentation'
      ],
      whatYouGet: [
        'Account deactivation'
      ],
      whatYouDontGet: [
        'Account management, data access, or login access without legal process'
      ],
      documentsNeeded: [
        'Documentation as a verified family member or estate representative'
      ],
      timeEstimate: 'Varies',
      timeline: []
    },

    linkedin: {
      id: 'linkedin',
      name: 'LinkedIn',
      services: 'LinkedIn',
      featureName: null,
      settingsUrl: null,
      hasLegacyTool: false,
      planningSteps: [
        { id: 'linkedin-plan-1', text: 'Currently no legacy contact feature' },
        { id: 'linkedin-plan-2', text: 'A verified family member can request a memorial page or account closure' },
        { id: 'linkedin-plan-3', text: 'Consider exporting your connections and data periodically' }
      ],
      recoverySteps: [
        { id: 'linkedin-recover-1', text: 'A verified family member can request a memorial page or account closure' }
      ],
      tips: [
        'Consider exporting your connections and data periodically'
      ],
      warnings: [
        'No legacy contact feature available'
      ],
      whatYouGet: [
        'Memorial page or account closure'
      ],
      whatYouDontGet: [
        'Account management or login access without legal process'
      ],
      documentsNeeded: [
        'Proof of identity as a verified family member'
      ],
      timeEstimate: 'Varies',
      timeline: []
    }
  };

  // ---------------------------------------------------------------------------
  // Password vault emergency access (from Section 2 and Section 11.9)
  // ---------------------------------------------------------------------------

  const PASSWORD_MANAGERS = {
    '1password': {
      id: '1password',
      name: '1Password',
      featureName: 'Emergency Kit + Family/Teams sharing',
      settingsUrl: 'https://my.1password.com',
      planningSteps: [
        { id: '1password-plan-1', text: 'Set up a Family or Teams account' },
        { id: '1password-plan-2', text: 'Share a vault with your trusted person' },
        { id: '1password-plan-3', text: 'Store your Emergency Kit (account key + master password) in a physical safe' }
      ],
      recoverySteps: [
        { id: '1password-recover-1', text: 'If they used a 1Password Family or Teams plan, the family organizer or team admin can perform account recovery for members' },
        { id: '1password-recover-2', text: 'Look for a printed "Emergency Kit" (a PDF that 1Password generates containing the Secret Key and space to write the master password)' },
        { id: '1password-recover-3', text: 'Check the physical safe, filing cabinets, and anywhere they kept important papers' }
      ],
      tips: [
        'The Emergency Kit is a PDF document -- look for it in physical files',
        'Family organizer can perform account recovery for family members'
      ],
      warnings: [
        'Without the Emergency Kit or family/team admin access, the vault is unrecoverable'
      ]
    },

    bitwarden: {
      id: 'bitwarden',
      name: 'Bitwarden',
      featureName: 'Emergency Access',
      settingsUrl: 'https://vault.bitwarden.com',
      planningSteps: [
        { id: 'bitwarden-plan-1', text: 'Use the "Emergency Access" feature to grant a trusted contact access after a configurable waiting period' }
      ],
      recoverySteps: [
        { id: 'bitwarden-recover-1', text: 'If they used Bitwarden\'s Emergency Access feature and designated you as a trusted contact, you can request access' },
        { id: 'bitwarden-recover-2', text: 'After the designated waiting period (set by the account holder, typically 1 to 30 days), access is granted automatically' },
        { id: 'bitwarden-recover-3', text: 'If they used a Bitwarden Organization account, an admin can reset the master password for organization members' }
      ],
      tips: [
        'Emergency Access waiting period is configurable (1 to 30 days)',
        'Organization admins can reset master passwords for members'
      ],
      warnings: [
        'Without Emergency Access or org admin, the vault is unrecoverable',
        'Bitwarden explicitly states they cannot retrieve or reset a lost master password'
      ]
    },

    dashlane: {
      id: 'dashlane',
      name: 'Dashlane',
      featureName: 'Emergency Contact',
      settingsUrl: 'https://app.dashlane.com',
      planningSteps: [
        { id: 'dashlane-plan-1', text: 'Use the "Emergency Contact" feature' }
      ],
      recoverySteps: [
        { id: 'dashlane-recover-1', text: 'If they designated an Emergency Contact, you can request access' },
        { id: 'dashlane-recover-2', text: 'Dashlane supports biometric recovery on trusted devices; if you can access their phone with their biometric profile still active, you may be able to unlock Dashlane' }
      ],
      tips: [
        'Biometric recovery may work on trusted devices where the profile is still active'
      ],
      warnings: [
        'Biometric data degrades rapidly after death',
        'Without Emergency Contact designation, the vault is unrecoverable'
      ]
    },

    lastpass: {
      id: 'lastpass',
      name: 'LastPass',
      featureName: 'Emergency Access',
      settingsUrl: 'https://lastpass.com',
      planningSteps: [
        { id: 'lastpass-plan-1', text: 'Use the "Emergency Access" feature with a trusted contact and waiting period' }
      ],
      recoverySteps: [
        { id: 'lastpass-recover-1', text: 'If they set up Emergency Access and designated you, you can request access through LastPass' },
        { id: 'lastpass-recover-2', text: 'LastPass also supports account recovery via SMS or email for the account holder, but this requires access to their phone or email' }
      ],
      tips: [
        'Account recovery via SMS or email may work if you have access to the phone or email'
      ],
      warnings: [
        'Without Emergency Access, the vault is unrecoverable'
      ]
    },

    keeper: {
      id: 'keeper',
      name: 'Keeper',
      featureName: 'Emergency Access (Digital Legacy)',
      settingsUrl: 'https://keepersecurity.com',
      planningSteps: [
        { id: 'keeper-plan-1', text: 'Use the "Emergency Access" (KeeperChat) feature' }
      ],
      recoverySteps: [
        { id: 'keeper-recover-1', text: 'Keeper offers an Emergency Access (Digital Legacy) feature' },
        { id: 'keeper-recover-2', text: 'If the feature was configured, follow the designated access process' }
      ],
      tips: [],
      warnings: [
        'Without Emergency Access being configured, the vault is unrecoverable'
      ]
    }
  };

  // ---------------------------------------------------------------------------
  // Split-knowledge storage guidance (from Section 2.4 and Section 4)
  // ---------------------------------------------------------------------------

  const STORAGE_GUIDANCE = {
    principle: 'Consider splitting sensitive information -- for example, the master password in one location, the emergency kit in another. Let your executor or trusted person know where this information is stored, without telling them what it is yet.',
    locations: [
      {
        id: 'safe',
        name: 'Physical Safe or Safety Deposit Box',
        description: 'Store your password manager\'s master password and emergency kit in a fireproof safe or safe deposit box. This is the most secure physical option for critical access credentials.',
        recommended: true
      },
      {
        id: 'attorney',
        name: 'Estate Planning Attorney',
        description: 'A sealed envelope with your attorney keeps access information separate from your home and protected by attorney-client privilege. Ask your estate planning attorney about a separate digital estate plan document (keeps passwords out of the public will).',
        recommended: true
      },
      {
        id: 'vault',
        name: 'Password Vault Emergency Kit',
        description: 'Most password managers generate an emergency kit (PDF with your account key and space to write the master password). Print this kit and store it in one of the physical locations above -- never store it only digitally.',
        recommended: false
      },
      {
        id: 'trusted-person',
        name: 'Trusted Person (Sealed Envelope)',
        description: 'Give a sealed envelope to your designated digital executor or trusted person. Consider splitting information: the envelope with the trusted person contains part of the access, while the other part is in a separate location.',
        recommended: false
      }
    ],
    tips: [
      'Review and update this information at least annually',
      'Let your executor/trusted person know where this information is, without telling them what it is yet',
      'Consider splitting sensitive information (e.g., the master password in one location, the emergency kit in another)',
      'Include digital assets in your will or trust',
      'Ask your estate planning attorney about a separate digital estate plan document (keeps passwords out of the public will)'
    ]
  };

  // ---------------------------------------------------------------------------
  // Quick-Reference: Platform Death/Legacy Policies
  // ---------------------------------------------------------------------------

  const PLATFORM_POLICY_REFERENCE = [
    { platform: 'Google', hasLegacyTool: true, toolName: 'Inactive Account Manager', limitation: 'Must be set up while alive; court order needed otherwise' },
    { platform: 'Apple', hasLegacyTool: true, toolName: 'Legacy Contact', limitation: 'Access key required; account deleted after 3 years' },
    { platform: 'Facebook', hasLegacyTool: true, toolName: 'Legacy Contact', limitation: 'Cannot read messages or log in as the person' },
    { platform: 'Instagram', hasLegacyTool: false, toolName: 'N/A', limitation: 'Can only memorialize or delete; no management' },
    { platform: 'X (Twitter)', hasLegacyTool: false, toolName: 'N/A', limitation: 'Can request deactivation with documentation' },
    { platform: 'LinkedIn', hasLegacyTool: false, toolName: 'N/A', limitation: 'Can request memorial or closure' },
    { platform: 'Microsoft', hasLegacyTool: false, toolName: 'Next of Kin process', limitation: 'Requires court order; accounts close after 2 years of inactivity' },
    { platform: 'TikTok', hasLegacyTool: false, toolName: 'N/A', limitation: 'No formal memorialization as of 2025' },
    { platform: 'Snapchat', hasLegacyTool: false, toolName: 'N/A', limitation: 'No account transfer or management' },
    { platform: 'Pinterest', hasLegacyTool: false, toolName: 'N/A', limitation: 'Can request deactivation' },
    { platform: 'YouTube', hasLegacyTool: true, toolName: 'Inactive Account Manager (via Google)', limitation: 'Covered under Google; monetized channels need attention' }
  ];

  // ---------------------------------------------------------------------------
  // Resources section
  // ---------------------------------------------------------------------------

  const RESOURCES = {
    foundation: [
      {
        name: 'GYST (Get Your Shit Together)',
        url: 'https://getyourshittogether.org',
        description: 'Chanel Reynolds\' original checklist and expanded guides for legal, financial, and personal planning. Start here if you haven\'t yet.'
      }
    ],
    legal: [
      {
        name: 'RUFADAA Information',
        url: null,
        description: 'The Revised Uniform Fiduciary Access to Digital Assets Act has been adopted in 48 states and provides the legal framework for digital asset access after death. Ask your estate planning attorney about your state\'s version.'
      },
      {
        name: 'Nolo',
        url: 'https://www.nolo.com',
        description: 'Accessible legal guides including digital estate planning'
      },
      {
        name: 'FreeWill',
        url: 'https://www.freewill.com',
        description: 'Free online will creation tool'
      }
    ],
    security: [
      {
        name: 'Identity Theft Resource Center (ITRC)',
        url: 'https://www.idtheftcenter.org',
        description: 'Resources for preventing and responding to identity theft of deceased persons'
      },
      {
        name: 'Annual Credit Report',
        url: 'https://www.annualcreditreport.com',
        description: 'Free credit reports from all three bureaus'
      },
      {
        name: 'FTC Identity Theft',
        url: 'https://www.identitytheft.gov',
        description: 'Federal Trade Commission identity theft reporting and recovery'
      }
    ],
    digitalEstateTools: [
      {
        name: 'Password Managers with Emergency Access',
        url: null,
        description: '1Password, Bitwarden, Dashlane, LastPass, Keeper'
      },
      {
        name: 'Google Inactive Account Manager',
        url: 'https://myaccount.google.com/inactive',
        description: 'Set up what happens to your Google account after inactivity'
      },
      {
        name: 'Apple Legacy Contact',
        url: null,
        description: 'Settings > [Your Name] > Sign-In & Security > Legacy Contact'
      }
    ],
    grief: [
      {
        name: 'The Dougy Center',
        url: 'https://www.dougy.org',
        description: 'Grief support for children and families'
      },
      {
        name: 'GriefShare',
        url: 'https://www.griefshare.org',
        description: 'Support groups'
      },
      {
        name: 'National Alliance for Grieving Children',
        url: 'https://www.childrengrieve.org',
        description: 'Resources for grieving children'
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // Emotional support content (from Section 11.14)
  // ---------------------------------------------------------------------------

  const EMOTIONAL_CONTEXT = {
    sectionId: 'section-11-14',
    title: 'What to Expect Emotionally',
    content: 'This section would not be complete without acknowledging the emotional toll of this work. Searching through a loved one\'s digital life is intimate, exhausting, and often triggering.',
    experiences: [
      'Private conversations, photos, or content that surprises you',
      'Automated emails addressed to the deceased that arrive for months after death',
      'AI-generated "memories" or "on this day" notifications from platforms that do not know the person has died',
      'Frustrating, bureaucratic processes that feel dehumanizing when you are grieving',
      'The urge to rush through everything, or the opposite, the inability to face any of it'
    ],
    guidance: 'There is no wrong way to handle this. Some people work through it methodically and find it grounding. Others need to step away for weeks at a time. Consider asking a trusted, tech-savvy friend or family member to help with the mechanical parts (calling carriers, filling out forms, searching email) while you focus on the decisions that only you can make.',
    closingNote: 'If you need support, the resources in the main Resources section of this guide include grief support organizations. Use them. This work can wait. You cannot pour from an empty cup.'
  };

  // ---------------------------------------------------------------------------
  // Utility functions
  // ---------------------------------------------------------------------------

  /**
   * Returns all sections from both paths combined.
   * @returns {Array} All sections
   */
  function getAllSections() {
    return [...PATH_A_SECTIONS, ...PATH_B_SECTIONS];
  }

  /**
   * Finds a section by its ID.
   * @param {string} id - Section ID (e.g., 'section-1')
   * @returns {Object|undefined} The matching section or undefined
   */
  function getSectionById(id) {
    return getAllSections().find(function (s) { return s.id === id; });
  }

  /**
   * Counts all checklist items across all sections, subsections, and categories.
   * @returns {number} Total number of checklist items
   */
  function getTotalItemCount() {
    var count = 0;
    getAllSections().forEach(function (section) {
      if (section.subsections) {
        section.subsections.forEach(function (sub) {
          if (sub.categories) {
            sub.categories.forEach(function (cat) {
              if (cat.items) {
                count += cat.items.length;
              }
            });
          }
        });
      }
    });
    return count;
  }

  /**
   * Counts checklist items for a specific path.
   * @param {string} path - 'a' or 'b'
   * @returns {number} Total number of checklist items for that path
   */
  function getItemCountByPath(path) {
    var sections = path === 'a' ? PATH_A_SECTIONS : PATH_B_SECTIONS;
    var count = 0;
    sections.forEach(function (section) {
      if (section.subsections) {
        section.subsections.forEach(function (sub) {
          if (sub.categories) {
            sub.categories.forEach(function (cat) {
              if (cat.items) {
                count += cat.items.length;
              }
            });
          }
        });
      }
    });
    return count;
  }

  /**
   * Returns all checklist item IDs as a flat array.
   * @returns {Array<string>} All item IDs
   */
  function getAllItemIds() {
    var ids = [];
    getAllSections().forEach(function (section) {
      if (section.subsections) {
        section.subsections.forEach(function (sub) {
          if (sub.categories) {
            sub.categories.forEach(function (cat) {
              if (cat.items) {
                cat.items.forEach(function (item) {
                  ids.push(item.id);
                });
              }
            });
          }
        });
      }
    });
    return ids;
  }

  /**
   * Returns a flat array of all checklist items from a specific section.
   * @param {string} sectionId - Section ID (e.g., 'section-1')
   * @returns {Array} All items in that section
   */
  function getItemsBySection(sectionId) {
    var section = getSectionById(sectionId);
    if (!section) { return []; }
    var items = [];
    if (section.subsections) {
      section.subsections.forEach(function (sub) {
        if (sub.categories) {
          sub.categories.forEach(function (cat) {
            if (cat.items) {
              items = items.concat(cat.items);
            }
          });
        }
      });
    }
    return items;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  return {
    GUIDE_VERSION: GUIDE_VERSION,
    GUIDE_DATE: GUIDE_DATE,
    PATH_A_SECTIONS: PATH_A_SECTIONS,
    PATH_B_SECTIONS: PATH_B_SECTIONS,
    PLATFORMS: PLATFORMS,
    PASSWORD_MANAGERS: PASSWORD_MANAGERS,
    STORAGE_GUIDANCE: STORAGE_GUIDANCE,
    PLATFORM_POLICY_REFERENCE: PLATFORM_POLICY_REFERENCE,
    RESOURCES: RESOURCES,
    EMOTIONAL_CONTEXT: EMOTIONAL_CONTEXT,
    getAllSections: getAllSections,
    getSectionById: getSectionById,
    getTotalItemCount: getTotalItemCount,
    getItemCountByPath: getItemCountByPath,
    getAllItemIds: getAllItemIds,
    getItemsBySection: getItemsBySection
  };
})();
