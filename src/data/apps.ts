// Landing, privacy, and terms pages for apps I distribute. Add an entry here
// and the routes, prerendered HTML, and sitemap entries follow from it.

// Text fields marked "inline" may wrap a key combination in backticks
// (`⌃⌥⌘R`) and write links as [text](https://example.com).
export interface AppMenuRow {
  label?: string;
  shortcut?: string;
  submenu?: boolean;
  checked?: boolean;
  // A status line the app shows greyed out.
  info?: boolean;
  separator?: boolean;
  // Callout beside the row. `dy` moves its text up or down, in pixels.
  note?: { text: string; side: 'left' | 'right'; dy?: number };
}

export interface AppLanding {
  title: string;
  headline: string;
  lede: string;
  // Meta description and structured-data description, for search results.
  description: string;
  requirements: string;
  // `text` is inline.
  features: {
    icon: 'keyboard' | 'displays' | 'cable';
    title: string;
    text: string;
  }[];
  menu: AppMenuRow[];
  // `text` is inline.
  details: { term: string; text: string }[];
  icon: string;
  socialImage: string;
  download: string;
  // Pay-what-you-want checkout. The download button goes here when it is set,
  // and to `download` otherwise.
  purchaseUrl?: string;
  // Lowest price the checkout accepts, in US dollars, for structured data.
  // Keep it equal to the Gumroad listing's minimum.
  minimumPrice?: string;
}

export interface AppPolicy {
  slug: string;
  name: string;
  summary: string;
  repo: string;
  license: { name: string; url: string };
  minimumOs: string;
  updated: string;
  privacy: string[];
  terms: string[];
  landing: AppLanding;
}

export type PolicyKind = 'privacy' | 'terms';

export interface AppPolicyPage {
  app: AppPolicy;
  kind: PolicyKind;
  path: string;
  heading: string;
  title: string;
}

export const policyTitles: Record<PolicyKind, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};

export const realign: AppPolicy = {
  slug: 'realign',
  name: 'Realign',
  summary:
    'A macOS menu bar app that resets your window positions and sizing back to a saved layout.',
  repo: 'https://github.com/hunterphillips/realign',
  license: {
    name: 'MIT License',
    url: 'https://github.com/hunterphillips/realign/blob/main/LICENSE',
  },
  minimumOs: 'macOS 14 or later',
  updated: '2026-11-14',
  privacy: [
    'Realign runs entirely on your Mac. It does not collect, store, or send any personal data, and it makes no network requests. There are no accounts, no analytics, and no crash reporting.',
    'Saved layouts are stored on your Mac in a single file at ~/Library/Application Support/Realign/layouts.json. The file holds the position, size, and title of each saved window, the bundle identifier of the app it belongs to, and an identifier for each display. Nothing in it leaves your Mac. Deleting the file or the app removes it.',
    'On first launch, macOS asks you to grant Realign Accessibility access. Realign uses it to read window positions, sizes, and titles, and to move and resize windows. It does not read the contents of any window.',
    'If you buy Realign, the purchase goes through Gumroad. Gumroad collects your email address and payment details under its own privacy policy and shares your name and email address with the author.',
  ],
  terms: [
    'Realign is open-source software released under the MIT License. You may use, copy, modify, and distribute it under the terms of that license.',
    'Purchases are processed by Gumroad, which takes the payment, collects any sales tax, and emails the download link. For a question about a purchase or a refund, reply to that email.',
    'Realign is provided as is, without warranty of any kind. You use it at your own risk, and the author is not liable for any loss or damage that results from using it. The full disclaimer is in the license.',
    'Realign requires macOS 14 or later. It moves and resizes windows that belong to other apps through the macOS Accessibility API, so results depend on how each app responds. Realign is not affiliated with or endorsed by Apple.',
  ],
  landing: {
    title: 'Realign: save and restore your Mac window layout',
    headline: 'Put your windows back where you had them.',
    lede: 'Realign resets your Mac window positions & sizing back to a saved layout.',
    description:
      'A macOS menu bar app that saves your window layout and restores it with a keyboard shortcut, or by itself when you plug in or unplug a monitor.',
    requirements: 'Requires macOS 14 or later, on Apple silicon or Intel.',
    features: [
      {
        icon: 'keyboard',
        title: 'Save and realign',
        text: 'Arrange your windows, then press `⌃⌥⌘S` to save the layout. Press `⌃⌥⌘R` to realign.',
      },
      {
        icon: 'displays',
        title: 'A layout for each setup',
        text: 'Realign keeps one layout for your laptop and one for each set of external monitors.',
      },
      {
        icon: 'cable',
        title: 'Auto-restore',
        text: 'Realign can restore your layout by itself when you plug in or unplug a monitor.',
      },
    ],
    menu: [
      {
        label: 'Restore Laptop Layout',
        note: { text: 'Put your windows back', side: 'right', dy: -34 },
      },
      { label: 'Restore Multi-Display Layout', shortcut: '⌃⌥⌘R' },
      {
        label: 'Save Current Layout',
        shortcut: '⌃⌥⌘S',
        note: { text: 'Save your layout', side: 'right', dy: 22 },
      },
      { separator: true },
      {
        label: 'Restore Shortcut',
        submenu: true,
        note: {
          text: 'Choose which layout the shortcut applies',
          side: 'left',
          dy: -30,
        },
      },
      { separator: true },
      { label: 'Laptop layout: saved Nov 12 at 9:41 AM', info: true },
      {
        label: 'Connected displays (1 external): saved Nov 12 at 9:44 AM',
        info: true,
      },
      {
        label: 'Auto-Restore on Display Change',
        checked: true,
        note: {
          text: 'Restore when you plug in or unplug a monitor',
          side: 'left',
          dy: 26,
        },
      },
      { label: 'Launch at Login' },
      { separator: true },
      { label: 'Quit Realign', shortcut: '⌘Q' },
    ],
    details: [
      {
        term: 'Privacy',
        text: 'Realign stores layouts in one file on your Mac. It makes no network requests and has no accounts or analytics.',
      },
      {
        term: 'Permission',
        text: 'On first launch, macOS asks for Accessibility access, which Realign needs to move windows.',
      },
    ],
    icon: '/assets/realign-icon.svg',
    socialImage: '/assets/realign-social.png',
    download: 'https://github.com/hunterphillips/realign/releases/latest',
    purchaseUrl: 'https://hkphillips.gumroad.com/l/realign',
    minimumPrice: '2.99',
  },
};

export const apps: AppPolicy[] = [realign];

export interface AppLandingPage {
  app: AppPolicy;
  path: string;
}

export const appLandingPages: AppLandingPage[] = apps.map((app) => ({
  app,
  path: `/apps/${app.slug}`,
}));

export const appPolicyPages: AppPolicyPage[] = apps.flatMap((app) =>
  (['privacy', 'terms'] as const).map((kind) => ({
    app,
    kind,
    path: `/apps/${app.slug}/${kind}`,
    heading: policyTitles[kind],
    title: `${app.name} ${policyTitles[kind]}`,
  })),
);
