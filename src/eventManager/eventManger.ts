export default class EventManager {
    private static instance: EventManager | null = null;
    private eventListeners: Record<string, Function[]> = {};

    public static getInstance(): EventManager {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    public addListner(eventName: string, callback: Function) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
    }

    public removeListner(eventName: string, callback: Function) {
        const listeners = this.eventListeners[eventName];
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    public triggerEvent(eventName: string, ...args: any[]) {
        const listeners = this.eventListeners[eventName];
        if (listeners) {
            listeners.forEach(callback => callback(...args));
        }
    }
}