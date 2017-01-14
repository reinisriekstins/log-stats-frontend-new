import cappedArgMap from 'lodash/fp/map'
import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import reduce from 'lodash/fp/reduce'

// see: https://github.com/lodash/lodash/wiki/FP-Guide#mapping
const map = cappedArgMap.convert({ cap: false })

export default (function () {
  // JS native Array.prototype.sort()
  // converted to lodash/fp friendly
  // immutable auto-curried iteratee-first data-last function
  function sort(fn) {
    return arr => {
      let newArr = Array.from(arr)
      return newArr.sort(fn)
    }
  }

  // a fn to put into the sort fn, that
  // sort by a property of an object
  function byProp(prop) {
    return (a, b) => {
      if (a[prop] > b[prop]) return -1
      else if (a[prop] < b[prop]) return 1
      return 0
    }
  }

/**----------------------
 *
 * Exported functions
 *
 *-----------------------*/
/**
 * getPlayers()
 * @param {Array} logs An Array of logs retrieved from logs.tf/json/[number].
 * @returns {Array} Returns an array of objects.
 *
 * Structure of the object in return array:
 * {
 *  steamId: {string} A string containing the steamId of a player found in one or more of the logs.
 *  names: [ {Array} An array of objects, sorted by count property in each object
 *    {
 *      name: {string} A name the player has used in the logs
 *      count: {number} The amount of times that name he used in those logs
 *    },
 *    ...
 *  ]
 * }
 *
 */
  function getPlayers(logs) {
    return flow(
      map(log => log.names),
      // convert the names object into an array of objects
      map(names => map((name, steamId) => ({
        steamId,
        name
      }))(names)),
      flatten,
      // remove duplicate steam ids by creating
      // an array of names the player has used in the logs
      reduce((acc, curr) => {

        // try finding if the player already is in the
        // new array by matching steam ids
        const player =
          acc.find(p => p.steamId === curr.steamId)

        // if player is found
        if (player) {
          const { names } = player

          // find if the name is already in the names array
          const name =
            names.find(n => n.name === curr.name)

          // if it's already there,
          // just increase the occurence count
          if (name) name.count += 1

          // otherwise push the new name in names array
          else names.push({ name: curr.name, count: 1 })
        }
        // if not found, push the player into the new array
        else acc.push({
          steamId: curr.steamId,
          names: [{ name: curr.name, count: 1 }]
        })
        return acc
      }, []),
      // sort names of every player by number of occurences
      map(player => {
        //// THIS IS NOT FUNCTIONAL.
        //// REWRITE IT WITH THE FUNCTIONAL sort
        player.names.sort(byProp('count'))
        return player
      }),
      // add mapsPlayed property to each player
      map(player => {
        player.mapsPlayed =
          reduce((mapsPlayed, name) =>
            mapsPlayed += name.count,0)(player.names)

        return player
      }),
      // sort players by the amount of maps played
      sort(byProp('mapsPlayed'))
    )(logs)
  }

/**----------------------
 *
 * Dynamic
 *
 *-----------------------*/
  const Factory = (logs) => {
    const Obj = {}
    Obj.getPlayers = () => getPlayers(logs)

    return Obj
  }

/**----------------------
 *
 * Static
 *
 *-----------------------*/
  Factory.getPlayers = getPlayers

  return Factory
}())