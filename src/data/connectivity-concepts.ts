import type { ConceptStory } from './platform-concepts';
export type ConnectivityKey='access'|'routing'|'dns'|'paths';
export const CONNECTIVITY_STORIES:ConceptStory<ConnectivityKey>[]=[
{key:'access',ordinal:'01',name:'Public & private access',model:'Reachability',cue:'Who can reach the entrance?',title:'A private entrance still needs an access check.',
definition: "A private endpoint is a private network entrance, not proof of permission. Like a private quay checking cargo permits, the application must still check who may use it.",
analogy:'A boom shuts the public harbour entrance. At the private quay, an invalid cargo permit is rejected while an approved consignment reaches the warehouse. The entrance represents network reachability; the permit represents permission to use the application.',
question: "Which clients need access, over which networks—and how will you test public restrictions, private DNS and application permissions?",
action:'Close the boom & check permits',reset:'Reopen the public entrance',before: "Public and private entrances are open. Reachability and permission are separate.",after: "Public access closes. At the private quay, the invalid permit is denied and the approved cargo passes.",
lesson:'A private endpoint does not necessarily disable public access; explicitly restrict it when required. Private connectivity does not replace authentication, authorization or appropriate encryption.'},
{key:'routing',ordinal:'02',name:'Routing',model:'Path',cue:'Where does the traffic actually go?',title:'A firewall only checks traffic that passes through it.',
definition: "A firewall sees only traffic routed through it. Like sending cargo through customs, inspection needs the intended path, a working return route and rules that allow the exchange.",
analogy:'A direct loading route bypasses the customs house. Send the consignment through customs instead, then follow its return manifest back through the same check. Cargo represents a request; the return manifest represents its reply. The stamps show which traffic was inspected.',
question: "Which traffic needs inspection, and do the effective routes and firewall rules enforce that path in both directions?",
action:'Send cargo through customs',reset:'Restore the direct route',before: "The direct loading route bypasses customs.",after: "Cargo and its return manifest pass customs. Both directions are inspected in this example.",
lesson:'A route makes a path possible. It does not itself grant access or guarantee delivery.'},
{key:'dns',ordinal:'03',name:'DNS',model:'Discovery',cue:'Which address does the name return?',title:'Find the address first. Then make the connection.',
definition: "DNS finds an address, like harbour radio finding a berth. The client then makes the connection; its answer depends on resolver configuration and cached records.",
analogy:'The captain radios the harbour directory for the current berth. The reply updates the captain’s old note, then the yacht sails directly to that quay. The directory represents DNS, the berth represents an address, and the voyage represents the application connection. The new berth is reachable in this example.',
question: "What address does each client actually resolve, and can it connect there after a record or network change?",
action:'Ask harbour radio for the berth',reset:'Restore the captain’s old note',before: "The directory knows the new berth; this client has an old cached answer.",after: "This client gets the new address and connects. Other clients may still have the old answer.",
lesson:'Changing DNS is not an instant global traffic switch. Test resolution and connectivity separately.'},
{key:'paths',ordinal:'04',name:'Redundant connections',model:'Failure',cue:'What does the second route survive?',title:'A backup should restore delivery, not just add a line.',
definition: "A second route helps only if it survives the failure and carries the workload. An outer shipping channel can restore deliveries, but it cannot undo missed arrivals.",
analogy:'A closure blocks the inner shipping channel. A waiting vessel cannot get through, and scheduled arrivals are missed. A following delivery uses the prepared outer passage instead. The harbour log keeps the missed arrivals visible: a backup restores delivery but does not erase the interruption.',
question: "Which failures must the backup path survive, how much traffic must it carry, and how will you test the interruption and return to normal?",
action:'Close the inner shipping channel',reset:'Reopen the inner channel',before: "The inner channel serves deliveries; an outer passage is prepared.",after: "The inner channel closes. Later deliveries use the outer passage; missed arrivals remain missed.",
lesson:'A second connection is not proof of independent failure domains or enough recovery capacity.'}
];
