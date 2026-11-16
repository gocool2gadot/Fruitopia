export type CategoryType = 'all' | 'smoothies' | 'toasts' | 'soups' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'smoothies' | 'toasts' | 'soups' | 'drinks';
  badge?: string;
  customizable?: boolean;
  description: string;
  image?: string;
  refImage?: string;
  microImage?: string;
  hotspotId?: 'smoothie' | 'toast' | 'soup' | 'buttermilk';
}

export interface HotspotInfo {
  id: 'smoothie' | 'toast' | 'soup' | 'buttermilk';
  tag: string;
  title: string;
  price: string;
  desc: string;
  waText: string;
  position: [number, number, number];
}
