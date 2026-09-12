import type { ConceptStory } from './platform-concepts';
export type ConnectivityKey='access'|'routing'|'dns'|'paths';
export const CONNECTIVITY_STORIES:ConceptStory<ConnectivityKey>[]=[
{key:'access',ordinal:'01',name:'Public & private access',model:'Reachability',cue:'Who can reach the entrance?',title:'A private entrance still needs an access check.',
definition:'A public endpoint can be reachable from public networks. A private endpoint uses a private network address. Neither choice replaces authentication, authorisation or appropriate encryption.',
analogy:'The service has an open-sea entrance and a private channel. In this example, closing the public entrance leaves the approved private route available.',
question:'Must this service be reachable only through approved private networks?',answers:{yes:'Provide a working private route and DNS, then explicitly restrict public access where the service supports it. Test both allowed and denied clients.',no:'A public endpoint may fit the audience. Define who may use it, require appropriate authentication and encryption, and protect the exposed entry point.'},
action:'Close the public entrance',reset:'Restore both entrances',before:'Two entrances reach the service. Adding the private one did not close the public one.',after:'The public entrance is closed in this scenario. The private route still needs identity checks and a working return path.',
lesson:'Private connectivity is a network property, not a complete security or compliance decision.'},
{key:'routing',ordinal:'02',name:'Routing',model:'Path',cue:'Where does the traffic actually go?',title:'Drawing a checkpoint does not send traffic through it.',
definition:'Routes determine the next hop toward a destination. A firewall only inspects traffic that actually traverses it, with a valid return path and the required rules.',
analogy:'A direct shipping lane bypasses the inspection quay. Changing the selected route sends the vessel through that checkpoint before the destination.',
question:'Must this connection pass through a specific inspection point?',answers:{yes:'Verify effective routes in both directions, forwarding and firewall policy. Test that a more specific or alternative route cannot bypass the intended inspection.',no:'A supported direct route may be simpler. Still define allowed destinations, return routing and how you observe the connection.'},
action:'Route through the checkpoint',reset:'Restore the direct route',before:'The checkpoint exists, but the direct lane bypasses it.',after:'The selected outbound route passes the checkpoint. Verify the return route separately; the illustration shows one direction.',
lesson:'A route makes a path possible. It does not itself grant access or guarantee delivery.'},
{key:'dns',ordinal:'03',name:'DNS',model:'Discovery',cue:'Which address does the name return?',title:'The right harbour name can point to the wrong pier.',
definition:'DNS resolves a name to an address. The answer depends on the client’s resolver, zones, forwarding and cache. The application must then connect to that address.',
analogy:'The directory still lists the old pier. Updating the answer seen by this vessel sends it to the intended private pier instead.',
question:'Does the same service name need a private answer for these clients?',answers:{yes:'Design private zones and resolver forwarding for every client network. Query from each location and verify the resulting address and application connection.',no:'Public DNS may be sufficient. Still manage record changes, cache lifetimes and resolver availability; a correct name does not guarantee a usable service.'},
action:'Use the corrected DNS answer',reset:'Restore the old answer',before:'orders.example resolves to the old pier for this client.',after:'This client now sees the intended private address. Other clients may still have cached answers until their cache expires or is refreshed.',
lesson:'Changing DNS is not an instant global traffic switch. Test resolution and connectivity separately.'},
{key:'paths',ordinal:'04',name:'Redundant connections',model:'Failure',cue:'What does the second route survive?',title:'Two lines are useful only if the failure misses one.',
definition:'A backup connection must survive the failure in scope and carry the required traffic. Shared routers, ducts, carriers or locations can defeat apparent redundancy.',
analogy:'A closure blocks the main channel. A prepared route around the other side remains open in this example, so the next delivery can use it.',
question:'Must this operation continue when its primary connection fails?',answers:{yes:'Identify shared failure points, size the surviving path and measure failover and failback. Test DNS, routing, security and application sessions during the change.',no:'Document the interruption you accept, how you detect it and who restores the path. Avoid claiming resilience that the design does not provide.'},
action:'Close the primary channel',reset:'Reopen the primary channel',before:'The main channel is preferred; a separate route is prepared.',after:'The next delivery takes the surviving route. Real switching takes time and existing sessions may need to reconnect.',
lesson:'A second connection is not proof of independent failure domains or enough recovery capacity.'}
];
