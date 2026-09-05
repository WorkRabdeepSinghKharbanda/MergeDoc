const WORD_LIST = (
  'apple river mountain forest ocean tiger eagle silver golden bridge castle garden thunder crystal shadow flame velvet marble copper amber ' +
  'winter summer autumn spring desert island canyon meadow harbor voyage compass lantern anchor falcon panther dolphin maple willow cedar ' +
  'granite quartz diamond emerald sapphire ruby coral pearl ivory ebony violet indigo crimson scarlet azure jungle glacier volcano canyon ' +
  'whisper echo shimmer breeze storm cascade horizon zenith comet meteor galaxy nebula orbit rocket voyager pioneer ranger hunter guardian ' +
  'phoenix dragon griffin unicorn wizard knight archer ranger nomad wanderer pilgrim explorer captain sailor pirate viking samurai ninja'
).split(/\s+/)

export function generatePassphrase(wordCount: number, separator: string): string {
  const bytes = new Uint32Array(wordCount)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => WORD_LIST[b % WORD_LIST.length]).join(separator)
}
