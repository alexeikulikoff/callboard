
export interface Queue{
	id: number;
	name: string;
	count1: number;
}
export interface Agent{
	id: number;
	name: string;
}

export interface QueueMemberStatusEvent {
    /*private*/ privilege : string;

    /*private*/ queue : string;

    /*private*/ location : string;

    /*private*/ membername : string;

    /*private*/ stateinterface : string;

    /*private*/ membership : string;

    /*private*/ penalty : string;

    /*private*/ callstaken : string;

    /*private*/ lastcall : string;

    /*private*/ status : string;

    /*private*/ paused : string;

    /*private*/ queueid : string;

}
export interface QueueMemberRemovedEvent {
    /*private*/ queue : string;

    /*private*/ location : string;

    /*private*/ membername : string;

    /*private*/ queueid : string;
}
export interface QueueMemberAddedEvent {
	
    /*private*/ privilege : string;

    /*private*/ queue : string;

    /*private*/ location : string;

    /*private*/ membername : string;

    /*private*/ stateinterface : string;

    /*private*/ membership : string;

    /*private*/ penalty : string;

    /*private*/ callstaken : string;

    /*private*/ lastcall : string;

    /*private*/ status : string;

    /*private*/ paused : string;

    /*private*/ agentname : string;

    /*private*/ queueid : string;

}
export interface AgentCalledEvent {
	
    /*private*/ privilege : string;

    /*private*/ channel : string;

    /*private*/ channelstate : string;

    /*private*/ channelstateDesc : string;

    /*private*/ callerIdnum : string;

    /*private*/ callerIdname : string;

    /*private*/ connectedlinenum : string;

    /*private*/ connectedlinename : string;

    /*private*/ language : string;

    /*private*/ accountcode : string;

    /*private*/ context : string;

    /*private*/ exten : string;

    /*private*/ priority : string;

    /*private*/ uniqueid : string;

    /*private*/ linkedid : string;

    /*private*/ destchannel : string;

    /*private*/ destchannelstate : string;

    /*private*/ destchannelstatedesc : string;

    /*private*/ destcallerIdnum : string;

    /*private*/ destcallerIdname : string;

    /*private*/ destconnectedlinenum : string;

    /*private*/ destconnectedlinename : string;

    /*private*/ destlanguage : string;

    /*private*/ destaccountcode : string;

    /*private*/ destcontext : string;

    /*private*/ destexten : string;

    /*private*/ destpriority : string;

    /*private*/ destuniqueid : string;

    /*private*/ destlinkedid : string;

    /*private*/ queue : string;

    /*private*/ mmembermame : string;
}

export interface BridgeEvent {
    /*private*/ bridgestate : string;

    /*private*/ bridgetype : string;

    /*private*/ channel1 : string;

    /*private*/ channel2 : string;

    /*private*/ uniqueid1 : string;

    /*private*/ uniqueid2 : string;

    /*private*/ callerid1 : string;

    /*private*/ callerid2 : string;

    /*private*/ customer : string;

}
export interface QueueCallerAbandonEvent {
    /*private*/ privilege : string;

    /*private*/ channel : string;

    /*private*/ channelstate : string;

    /*private*/ channelstatedesc : string;

    /*private*/ calleridnum : string;

    /*private*/ calleridname : string;

    /*private*/ connectedlinenum : string;

    /*private*/ connectedlinename : string;

    /*private*/ language : string;

    /*private*/ accountcode : string;

    /*private*/ context : string;

    /*private*/ exten : string;

    /*private*/ priority : string;

    /*private*/ uniqueid : string;

    /*private*/ linkedid : string;

    /*private*/ queue : string;

    /*private*/ position : string;

    /*private*/ originalposition : string;

    /*private*/ holdtime : string;
}


