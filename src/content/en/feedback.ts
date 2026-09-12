/** Observations shown only on request. Keep language editable independently of state rules. */
export const feedbackCopy = {
  towerOrder: (level: number) =>
    `Look at cube ${level} from the bottom. The tower needs the largest remaining cube at each level. Lift the cubes above that point to compare again.`,
  towerAlignment:
    "The cubes are in size order, but one or more are off center. Compare the edges; lift upper cubes if you need to reach a lower one.",
  towerContinue: (n: number) =>
    `The ${n} placed cubes follow the intended order and alignment. Continue with the largest cube still on the mat.`,
  towerStart:
    "Begin with the largest cube on the mat, then build toward the smallest.",
  sequenceOrder: (place: number) =>
    `Compare position ${place} with the loose pieces. This arrangement begins with the largest and gets smaller one step at a time. Return a piece to rearrange it.`,
  sequenceContinue: (n: number) =>
    `${n} pieces follow the intended progression. Continue with the largest remaining piece.`,
  sequenceStart:
    "Place the longest rod or thickest prism first, then compare the remaining pieces.",
  colorMismatch:
    "One pair contains different colors. Separate that pair and compare the tablets again.",
  colorContinue: (n: number) =>
    `${n} matching pairs are together. Pair the remaining tablets by color.`,
  fittingMismatch:
    "The selected piece does not match that opening. Compare its width or outline with another empty opening.",
  fittingReturn: (n: number) =>
    `${n} pieces are outside the board. Return them to matching openings.`,
  fittingLift: (n: number) =>
    `The board is assembled, but ${n} pieces have not been lifted yet. This exercise includes lifting and replacing every piece.`,
  dressingOpen:
    "The frame starts fastened. Open every button, then separate the fabric before bringing it together again.",
  dressingSeparate:
    "All buttons are open. Separate the fabric to continue the full movement.",
  dressingJoin:
    "The fabric is apart. Bring the two sides together before closing the buttons.",
  dressingClose: (n: number) =>
    `The fabric has been opened and rejoined. Close the ${n} remaining buttons to finish.`,
  transfer: (n: number) =>
    `${n} objects are in the right bowl. Move the remaining objects one at a time.`,
  pourStart:
    "Pick up the pitcher, position its spout over the cup, and tilt gently.",
  pourPosition:
    "The pitcher is tilted away from the cup. Bring it upright, then position the spout over the cup before pouring again.",
  pourContinue:
    "There is still water in the pitcher. Continue pouring over the cup; return the pitcher upright afterward.",
  pourUpright:
    "The pitcher is empty. Bring it upright before putting it back on the tray.",
  pourReturn: "The pitcher is upright and empty. Return it to the tray.",
  pourWipe:
    "Water is on the tray. Return the pitcher if necessary, then wipe the spill.",
  pourRetry:
    "The pitcher is empty, but no water reached the cup. Start again and position the spout over the cup before tilting.",
  countersCards:
    "The numeral row is incomplete or out of order. Arrange the cards from 1 to 10 before comparing their quantities.",
  countersQuantity: (n: number, count: number) =>
    `Under numeral ${n}, you have placed ${count} counters. Recount that group and compare it with the numeral.`,
  countersPairs: (n: number) =>
    `The quantity beneath ${n} matches. Now arrange it in pairs, with any unpaired counter centered below the last pair.`,
  stampAddend: (row: number, actual: number, target: number) =>
    `Addend ${row} currently represents ${actual}; the problem calls for ${target}. ${"Compare its thousands, hundreds, tens, and units. Separate the addends first if they are combined."}`,
  stampCombine:
    "Both addends represent the problem. Remove the divider and bring the quantities together.",
  stampExchange:
    "A category contains ten or more stamps. Exchange ten for one of the next category, beginning with units.",
  stampRecord:
    "The combined stamps are ready to count. Record their value in the sum box.",
  stampAnswer:
    "Your written sum differs from the stamps. Count each place-value column and compare it with what you recorded.",
  fractionStart:
    "Move smaller equal pieces into the comparison frame. Try to cover the pale reference area.",
  fractionGap:
    "Your pieces cover less area than the reference. A gap remains; try adding a piece or exploring another denominator.",
  fractionOver:
    "Your pieces extend beyond the reference area. Return a piece or try a different size.",
  fractionEqualParts:
    "The covered area matches. For this equivalence study, build it with smaller pieces that are all the same size.",
  triangles: (n: number) =>
    `${n} of the three pairs have matching black edges joined. For the others, check both rotation and position; the edges should meet without a gap or overlap.`,
  mapLoose: (n: number) =>
    `${n} continent pieces are outside their matching outlines. Compare their coastlines and move them back into the board.`,
  mapLift: (n: number) =>
    `The map is assembled. ${n} continents still need to be lifted and returned to complete this exploration.`,
};
