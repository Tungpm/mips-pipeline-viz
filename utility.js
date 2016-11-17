/**
 * Created by Son Pham on 11/10/2016.
 */

/**
 * Check if string contains all zero bits
 * @param s
 * @returns {boolean}
 */
function check_zero(s) {
  try {
    for (var i = 0; i < s.length; i++) {
      if (s[i] != '0') return false
    }
    return true
  } catch (e) {
    return true
  }

}