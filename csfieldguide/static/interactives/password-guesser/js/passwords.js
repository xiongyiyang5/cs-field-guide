/**
 * Module for all the passwords used in Password Guesser.
 * 
 * Passwords are stored in lists of lists, where each list is four items:
 * [name, the password or encryption , salt, [encryption with salt]]
 * The id of each password is a person's name
 * 
 * Language-specific passwords are stored as plaintext and encrypted at runtime
 * The remainder are encrypted in advance
 * 
 * Salts were generated at https://www.random.org/strings/
 */

/**
 * Passwords that are language specific
 * stored as plaintext
 * 
 * Medium difficulty
 */
var LanguagePasswords = [
  ["Alice", gettext("Maths"),     "3Lh7nlv4vw0glpq5", null],
  ["Bob",   gettext("History"),   "jRsZZaY2fBppefuf", null],
  ["Casey", gettext("Art"),       "BIOAEb6DLc6RDopT", null],
  ["Dave",  gettext("Chemistry"), "5YpTZ9kJzk1Mn4xO", null],
];

/**
 * Passwords that are one specific sequence of characters
 * encrypted in advance
 * 
 * Easy-medium difficulty
 */
var WordPasswords = [
  ["Evelyn",   "5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5", "4B9iTLSL27THrK0M", "593A4CA0674F8729B7192F48801E765B60430C61F07303D01505010D2AEADFA3"], // 12345
  ["Frank",    "5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5", "9pUOuSMy8g5gosp7", "22CB49E86CE07869D909D30C40566E15B10118F33F65F048092A1946F3843447"], // 12345
  ["Grant",    "65E84BE33532FB784C48129675F9EFF3A682B27168C0EA744B2CF58EE02337C5", "B3W2w9A16ZTC0qKc", "EF6B7840D5219F7CE78E84039A1EE18F63173795BD16F31107E4B01E7DD49241"], // qwerty
  ["Hannah",   "79CB79153C08657ED66FE366E7E92FEF8DCBC8BE1A2E91F7CACE938D61DC4B96", "F0LGkqngVY2i3WPP", "8389171422297BBE506EF909BFAD8D1FCD3C35738F481DE092AD93A7946CDB3D"], // Hannah
  ["Isabelle", "8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918", "gdDAOlnmLtEeSlhY", "0E66D5C838959F2A00C55D392281401FB55452CDF11F802D767D054EFFC1AF55"], // admin
  ["Jack",     "97C94EBE5D767A353B77F3C0CE2D429741F2E8C99473C3C150E2FAA3D14C9DA6", "rRiTDOYooATVXmdR", "439464EF67EA97952C588A2C4032756D7F2CC8CC7FC24619AEA0D85FD2A91FD4"], // Pa$$w0rd
  ["Kate",     "B5C5FA751BFE75D18F266DBB7C11C4EC5A3A4E788AB64217821FB490642488B3", "piHNbJunE1U1zorO", "C23720935587E3CE2100A5B3867A60B3648F8A514167375084034CD37C28C01A"], // H0m3wOr/
  ["Liam",     "2F3F3C491C80D04480C6FDDF8BC6E1BCB6E93A22FE542E688F5C61563C0E9A97", "uIKp9FjJ6QsF6qvS", "BA9FC99BAC73C7240D3F33D154E96F7943C963BE2F97DD0C50E433F374AC44BA"], // 0xC0FFEE
  ["Michaela", "43C81A741D28A1EA634D759043D4556A7694BD9BA4002D81686857D80AF3A5CD", "uLep9JTiRmM1T9gr", "E9647CA96254FE360F4313CE51995FBA45C062FA27C66586E8B8F6054B310A7D"], // !2x7A
];

/**
 * Passwords that are specific groups of words
 * encrypted in advance
 * 
 * Hard difficulty
 */
var SentencePasswords = [
  ["Nat", "967C96729B4E195995B0F2C5BD7B9A23BC784F451AF8AD1A9D94935E7C0A53B8", "kojuVmBIvkQCzrXp", "1542CBF9896D7053A0346FF33F06A5804FD058AB22F583970E5E792FB174FB3E"], // iREALLYlikebread
];

module.exports = {
  LanguagePasswords,
  WordPasswords,
  SentencePasswords,
};