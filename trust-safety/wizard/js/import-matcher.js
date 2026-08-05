/**
 * WizardImportMatcher -- Domain-to-category matching engine.
 * Maps imported account URLs and names to Section 1 checklist items.
 * Part of Epic #1582 (Browser Data Import), Story #1853.
 */
const WizardImportMatcher = (() => {
  'use strict';

  // Domain -> { categoryId, itemId } lookup table.
  // Each domain maps to the most specific checklist item it matches.
  var DOMAIN_MAP = {
    // Email
    'mail.google.com':       { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'gmail.com':             { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'outlook.com':           { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'outlook.live.com':      { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'outlook.office.com':    { categoryId: 'section-1-1-email', itemId: 'a-1-1-3' },
    'outlook.office365.com': { categoryId: 'section-1-1-email', itemId: 'a-1-1-3' },
    'mail.yahoo.com':        { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'yahoo.com':             { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'protonmail.com':        { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'mail.protonmail.com':   { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'proton.me':             { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'aol.com':               { categoryId: 'section-1-1-email', itemId: 'a-1-1-4' },
    'mail.aol.com':          { categoryId: 'section-1-1-email', itemId: 'a-1-1-4' },
    'icloud.com':            { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-29' },
    'fastmail.com':          { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },
    'zoho.com':              { categoryId: 'section-1-1-email', itemId: 'a-1-1-1' },

    // Financial & Banking
    'chase.com':             { categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    'bankofamerica.com':     { categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    'wellsfargo.com':        { categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    'usbank.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    'citi.com':              { categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    'capitalone.com':        { categoryId: 'section-1-1-financial', itemId: 'a-1-1-7' },
    'discover.com':          { categoryId: 'section-1-1-financial', itemId: 'a-1-1-7' },
    'americanexpress.com':   { categoryId: 'section-1-1-financial', itemId: 'a-1-1-7' },
    'schwab.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-8' },
    'etrade.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-8' },
    'tdameritrade.com':      { categoryId: 'section-1-1-financial', itemId: 'a-1-1-8' },
    'robinhood.com':         { categoryId: 'section-1-1-financial', itemId: 'a-1-1-8' },
    'investor.vanguard.com': { categoryId: 'section-1-1-financial', itemId: 'a-1-1-9' },
    'vanguard.com':          { categoryId: 'section-1-1-financial', itemId: 'a-1-1-9' },
    'nb.fidelity.com':       { categoryId: 'section-1-1-financial', itemId: 'a-1-1-9' },
    'fidelity.com':          { categoryId: 'section-1-1-financial', itemId: 'a-1-1-9' },
    'coinbase.com':          { categoryId: 'section-1-1-financial', itemId: 'a-1-1-10' },
    'kraken.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-10' },
    'binance.com':           { categoryId: 'section-1-1-financial', itemId: 'a-1-1-10' },
    'gemini.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-10' },
    'paypal.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-11' },
    'venmo.com':             { categoryId: 'section-1-1-financial', itemId: 'a-1-1-11' },
    'cash.app':              { categoryId: 'section-1-1-financial', itemId: 'a-1-1-11' },
    'zellepay.com':          { categoryId: 'section-1-1-financial', itemId: 'a-1-1-11' },
    'turbotax.intuit.com':   { categoryId: 'section-1-1-financial', itemId: 'a-1-1-12' },
    'hrblock.com':           { categoryId: 'section-1-1-financial', itemId: 'a-1-1-12' },
    'mint.intuit.com':       { categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    'affirm.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-14' },
    'klarna.com':            { categoryId: 'section-1-1-financial', itemId: 'a-1-1-14' },
    'afterpay.com':          { categoryId: 'section-1-1-financial', itemId: 'a-1-1-14' },

    // Social Media
    'facebook.com':          { categoryId: 'section-1-1-social', itemId: 'a-1-1-15' },
    'instagram.com':         { categoryId: 'section-1-1-social', itemId: 'a-1-1-16' },
    'twitter.com':           { categoryId: 'section-1-1-social', itemId: 'a-1-1-17' },
    'x.com':                 { categoryId: 'section-1-1-social', itemId: 'a-1-1-17' },
    'linkedin.com':          { categoryId: 'section-1-1-social', itemId: 'a-1-1-18' },
    'tiktok.com':            { categoryId: 'section-1-1-social', itemId: 'a-1-1-19' },
    'snapchat.com':          { categoryId: 'section-1-1-social', itemId: 'a-1-1-20' },
    'reddit.com':            { categoryId: 'section-1-1-social', itemId: 'a-1-1-21' },
    'youtube.com':           { categoryId: 'section-1-1-social', itemId: 'a-1-1-22' },
    'threads.net':           { categoryId: 'section-1-1-social', itemId: 'a-1-1-23' },
    'bsky.app':              { categoryId: 'section-1-1-social', itemId: 'a-1-1-23' },
    'mastodon.social':       { categoryId: 'section-1-1-social', itemId: 'a-1-1-23' },
    'discord.com':           { categoryId: 'section-1-1-social', itemId: 'a-1-1-24' },
    'discordapp.com':        { categoryId: 'section-1-1-social', itemId: 'a-1-1-24' },
    'web.whatsapp.com':      { categoryId: 'section-1-1-social', itemId: 'a-1-1-25' },
    'whatsapp.com':          { categoryId: 'section-1-1-social', itemId: 'a-1-1-25' },
    'signal.org':            { categoryId: 'section-1-1-social', itemId: 'a-1-1-25' },
    'telegram.org':          { categoryId: 'section-1-1-social', itemId: 'a-1-1-25' },
    'web.telegram.org':      { categoryId: 'section-1-1-social', itemId: 'a-1-1-25' },
    'tinder.com':            { categoryId: 'section-1-1-social', itemId: 'a-1-1-26' },
    'bumble.com':            { categoryId: 'section-1-1-social', itemId: 'a-1-1-26' },
    'hinge.co':              { categoryId: 'section-1-1-social', itemId: 'a-1-1-26' },

    // Cloud Storage
    'drive.google.com':      { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-28' },
    'photos.google.com':     { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-28' },
    'dropbox.com':           { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-30' },
    'onedrive.live.com':     { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-31' },
    'onedrive.com':          { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-31' },
    'box.com':               { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-32' },
    'amazon.com/photos':     { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-33' },
    'backblaze.com':         { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-34' },
    'carbonite.com':         { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-34' },
    'shutterfly.com':        { categoryId: 'section-1-1-cloud', itemId: 'a-1-1-35' },

    // Subscriptions
    'netflix.com':           { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'hulu.com':              { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'disneyplus.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'max.com':               { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'hbomax.com':            { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'paramountplus.com':     { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'peacocktv.com':         { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'tv.apple.com':          { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'primevideo.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'crunchyroll.com':       { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    'spotify.com':           { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-37' },
    'accounts.spotify.com':  { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-37' },
    'music.apple.com':       { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-37' },
    'music.amazon.com':      { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-37' },
    'tidal.com':             { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-37' },
    'nytimes.com':           { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-38' },
    'wsj.com':               { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-38' },
    'washingtonpost.com':    { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-38' },
    'substack.com':          { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-38' },
    'account.adobe.com':     { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-39' },
    'adobe.com':             { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-39' },
    'office.com':            { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-39' },
    'store.steampowered.com': { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-40' },
    'store.playstation.com': { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-40' },
    'xbox.com':              { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-40' },
    'hellofresh.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-41' },
    'instacart.com':         { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-41' },
    'onepeloton.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-42' },
    'chat.openai.com':       { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-43' },
    'claude.ai':             { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-43' },
    'midjourney.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-43' },
    'nordvpn.com':           { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-44' },
    'expressvpn.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-44' },
    'namecheap.com':         { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-45' },
    'godaddy.com':           { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-45' },
    'cloudflare.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-45' },
    'aws.amazon.com':        { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-46' },
    'portal.azure.com':      { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-46' },
    'console.cloud.google.com': { categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-46' },

    // Shopping
    'amazon.com':            { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-47' },
    'ebay.com':              { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-48' },
    'etsy.com':              { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-49' },
    'walmart.com':           { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-50' },
    'target.com':            { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-50' },
    'costco.com':            { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-50' },
    'bestbuy.com':           { categoryId: 'section-1-1-shopping', itemId: 'a-1-1-50' },

    // Healthcare
    'mychart.providence.org': { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-55' },
    'mychart.com':           { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-55' },
    'cvs.com':               { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-56' },
    'walgreens.com':         { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-56' },
    'express-scripts.com':   { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-56' },
    'betterhelp.com':        { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-60' },
    'talkspace.com':         { categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-60' },

    // Government
    'ssa.gov':               { categoryId: 'section-1-1-government', itemId: 'a-1-1-61' },
    'irs.gov':               { categoryId: 'section-1-1-government', itemId: 'a-1-1-62' },
    'dmv.org':               { categoryId: 'section-1-1-government', itemId: 'a-1-1-64' },
    'va.gov':                { categoryId: 'section-1-1-government', itemId: 'a-1-1-65' },
    'usps.com':              { categoryId: 'section-1-1-government', itemId: 'a-1-1-66' },
    'informeddelivery.usps.com': { categoryId: 'section-1-1-government', itemId: 'a-1-1-66' },
    'login.gov':             { categoryId: 'section-1-1-government', itemId: 'a-1-1-70' },
    'id.me':                 { categoryId: 'section-1-1-government', itemId: 'a-1-1-70' },
    'tsa.gov':               { categoryId: 'section-1-1-government', itemId: 'a-1-1-68' },

    // Smart Home & IoT
    'home.google.com':       { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-71' },
    'alexa.amazon.com':      { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-71' },
    'home.nest.com':         { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-72' },
    'ecobee.com':            { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-72' },
    'account.ring.com':      { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-73' },
    'ring.com':              { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-73' },
    'wyze.com':              { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-73' },
    'arlo.com':              { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-73' },
    'simplisafe.com':        { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-73' },
    'irobot.com':            { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-75' },
    'meethue.com':           { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-76' },
    'tesla.com':             { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-77' },
    'fitbit.com':            { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-79' },
    'connect.garmin.com':    { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-79' },
    'garmin.com':            { categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-79' },

    // Professional
    'upwork.com':            { categoryId: 'section-1-1-professional', itemId: 'a-1-1-82' },
    'fiverr.com':            { categoryId: 'section-1-1-professional', itemId: 'a-1-1-82' },
    'wordpress.com':         { categoryId: 'section-1-1-professional', itemId: 'a-1-1-84' },
    'squarespace.com':       { categoryId: 'section-1-1-professional', itemId: 'a-1-1-84' },
    'wix.com':               { categoryId: 'section-1-1-professional', itemId: 'a-1-1-84' },
    'github.com':            { categoryId: 'section-1-1-professional', itemId: 'a-1-1-84' },

    // Loyalty
    'rakuten.com':           { categoryId: 'section-1-1-loyalty', itemId: 'a-1-1-92' },

    // Digital Content
    'kindle.amazon.com':     { categoryId: 'section-1-1-digital-content', itemId: 'a-1-1-93' },
    'store.steampowered.com': { categoryId: 'section-1-1-digital-content', itemId: 'a-1-1-96' },
    'epicgames.com':         { categoryId: 'section-1-1-digital-content', itemId: 'a-1-1-96' },
    'gog.com':               { categoryId: 'section-1-1-digital-content', itemId: 'a-1-1-96' },
    'play.google.com':       { categoryId: 'section-1-1-digital-content', itemId: 'a-1-1-97' }
  };

  // Category-level keyword fallbacks for records that don't match a specific domain.
  // Checked against the record name and sourceGroup (case-insensitive).
  var KEYWORD_CATEGORIES = [
    { keywords: ['email', 'mail', 'inbox', 'smtp', 'imap'], categoryId: 'section-1-1-email', itemId: 'a-1-1-2' },
    { keywords: ['bank', 'checking', 'savings', 'credit union', 'mortgage'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-6' },
    { keywords: ['credit card', 'visa', 'mastercard', 'amex'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-7' },
    { keywords: ['invest', 'brokerage', 'trading', 'stock'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-8' },
    { keywords: ['401k', 'ira', 'retirement', 'pension'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-9' },
    { keywords: ['crypto', 'bitcoin', 'ethereum', 'defi', 'wallet'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-10' },
    { keywords: ['payment', 'pay', 'transfer', 'money'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-11' },
    { keywords: ['tax', 'filing'], categoryId: 'section-1-1-financial', itemId: 'a-1-1-12' },
    { keywords: ['social', 'forum', 'community'], categoryId: 'section-1-1-social', itemId: 'a-1-1-27' },
    { keywords: ['cloud', 'storage', 'backup', 'sync'], categoryId: 'section-1-1-cloud', itemId: 'a-1-1-34' },
    { keywords: ['photo', 'photos', 'gallery', 'album'], categoryId: 'section-1-1-cloud', itemId: 'a-1-1-28' },
    { keywords: ['streaming', 'video', 'movies', 'tv', 'watch'], categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-36' },
    { keywords: ['music', 'audio', 'podcast', 'listen'], categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-37' },
    { keywords: ['news', 'newspaper', 'magazine', 'media'], categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-38' },
    { keywords: ['shop', 'shopping', 'store', 'retail', 'buy'], categoryId: 'section-1-1-shopping', itemId: 'a-1-1-52' },
    { keywords: ['grocery', 'food', 'delivery', 'meal'], categoryId: 'section-1-1-shopping', itemId: 'a-1-1-51' },
    { keywords: ['health', 'medical', 'doctor', 'patient', 'hospital', 'clinic'], categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-55' },
    { keywords: ['pharmacy', 'prescription', 'rx', 'drug'], categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-56' },
    { keywords: ['insurance'], categoryId: 'section-1-1-healthcare', itemId: 'a-1-1-53' },
    { keywords: ['government', 'gov', 'federal', 'state'], categoryId: 'section-1-1-government', itemId: 'a-1-1-70' },
    { keywords: ['smart home', 'thermostat', 'camera', 'doorbell', 'security'], categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-71' },
    { keywords: ['fitness', 'workout', 'gym', 'health tracker'], categoryId: 'section-1-1-smarthome', itemId: 'a-1-1-79' },
    { keywords: ['airline', 'flight', 'miles', 'travel'], categoryId: 'section-1-1-loyalty', itemId: 'a-1-1-88' },
    { keywords: ['hotel', 'lodging', 'booking'], categoryId: 'section-1-1-loyalty', itemId: 'a-1-1-89' },
    { keywords: ['game', 'gaming', 'playstation', 'xbox', 'nintendo', 'steam'], categoryId: 'section-1-1-digital-content', itemId: 'a-1-1-96' },
    { keywords: ['vpn'], categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-44' },
    { keywords: ['domain', 'hosting', 'registrar', 'dns'], categoryId: 'section-1-1-subscriptions', itemId: 'a-1-1-45' }
  ];

  // Build a lookup of itemId -> { categoryTitle, itemText } for display
  var _itemLookup = null;
  function _getItemLookup() {
    if (_itemLookup) { return _itemLookup; }
    _itemLookup = {};
    var section = WizardContent.getSectionById('section-1');
    if (!section) { return _itemLookup; }
    var subs = section.subsections || [];
    for (var si = 0; si < subs.length; si++) {
      var cats = subs[si].categories || [];
      for (var ci = 0; ci < cats.length; ci++) {
        var cat = cats[ci];
        var items = cat.items || [];
        for (var ii = 0; ii < items.length; ii++) {
          _itemLookup[items[ii].id] = {
            categoryId: cat.id,
            categoryTitle: cat.title || '',
            itemText: items[ii].text
          };
        }
      }
    }
    return _itemLookup;
  }

  /**
   * Extract hostname from a normalized URL.
   */
  function _extractHost(url) {
    if (!url) { return ''; }
    try {
      return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    } catch (_e) {
      return '';
    }
  }

  /**
   * Match a single import record to a Section 1 category and item.
   *
   * @param {Object} record - A normalized ImportRecord
   * @returns {Object} record with suggestedCategoryId, suggestedItemId, matchConfidence populated
   */
  function matchRecord(record) {
    var host = _extractHost(record.url);
    var lookup = _getItemLookup();

    // Phase 1: Exact domain match (try full host, then parent domain)
    if (host) {
      var match = DOMAIN_MAP[host];
      if (!match) {
        // Try stripping subdomain: account.ring.com -> ring.com
        var parts = host.split('.');
        if (parts.length > 2) {
          var parent = parts.slice(-2).join('.');
          match = DOMAIN_MAP[parent];
        }
      }
      if (match && lookup[match.itemId]) {
        record.suggestedCategoryId = match.categoryId;
        record.suggestedItemId = match.itemId;
        record.matchConfidence = 0.9;
        return record;
      }
    }

    // Phase 2: Keyword match against name + sourceGroup
    var searchText = ((record.name || '') + ' ' + (record.sourceGroup || '')).toLowerCase();
    if (searchText.trim()) {
      for (var i = 0; i < KEYWORD_CATEGORIES.length; i++) {
        var kw = KEYWORD_CATEGORIES[i];
        for (var j = 0; j < kw.keywords.length; j++) {
          if (searchText.indexOf(kw.keywords[j]) >= 0) {
            record.suggestedCategoryId = kw.categoryId;
            record.suggestedItemId = kw.itemId;
            record.matchConfidence = 0.5;
            return record;
          }
        }
      }
    }

    // Phase 3: No match
    record.matchConfidence = 0;
    return record;
  }

  /**
   * Match all records in a parse result.
   *
   * @param {Object[]} records - Array of ImportRecords
   * @returns {Object[]} Same records with match fields populated
   */
  function matchAll(records) {
    for (var i = 0; i < records.length; i++) {
      matchRecord(records[i]);
    }
    return records;
  }

  /**
   * Get display info for a matched item.
   *
   * @param {string} itemId
   * @returns {{ categoryTitle: string, itemText: string }|null}
   */
  function getMatchInfo(itemId) {
    if (!itemId) { return null; }
    var lookup = _getItemLookup();
    return lookup[itemId] || null;
  }

  return {
    matchRecord: matchRecord,
    matchAll: matchAll,
    getMatchInfo: getMatchInfo
  };
})();
