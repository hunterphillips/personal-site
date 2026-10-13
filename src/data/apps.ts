// Privacy and terms pages for apps I distribute. Add an entry here and the
// routes, prerendered HTML, and sitemap entries follow from it.

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
  updated: '2026-10-12',
  privacy: [
    'Realign runs entirely on your Mac. It does not collect, store, or send any personal data, and it makes no network requests. There are no accounts, no analytics, and no crash reporting.',
    'Saved layouts are stored on your Mac in a single file at ~/Library/Application Support/Realign/layouts.json. The file holds the position, size, and title of each saved window, the bundle identifier of the app it belongs to, and an identifier for each display. Nothing in it leaves your Mac. Deleting the file or the app removes it.',
    'On first launch, macOS asks you to grant Realign Accessibility access. Realign uses it to read window positions, sizes, and titles, and to move and resize windows. It does not read the contents of any window.',
  ],
  terms: [
    'Realign is free, open-source software released under the MIT License. You may use, copy, modify, and distribute it under the terms of that license.',
    'Realign is provided as is, without warranty of any kind. You use it at your own risk, and the author is not liable for any loss or damage that results from using it. The full disclaimer is in the license.',
    'Realign requires macOS 14 or later. It moves and resizes windows that belong to other apps through the macOS Accessibility API, so results depend on how each app responds. Realign is not affiliated with or endorsed by Apple.',
  ],
};

export const apps: AppPolicy[] = [realign];

export const appPolicyPages: AppPolicyPage[] = apps.flatMap((app) =>
  (['privacy', 'terms'] as const).map((kind) => ({
    app,
    kind,
    path: `/apps/${app.slug}/${kind}`,
    heading: policyTitles[kind],
    title: `${app.name} ${policyTitles[kind]}`,
  })),
);
