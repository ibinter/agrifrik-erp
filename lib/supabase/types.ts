export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cultures: {
        Row: {
          id: string;
          nom: string;
          parcelle: string;
          surface: number;
          stade: string;
          date_debut: string;
          date_fin: string | null;
          progress: number;
          rendement_prevu: number;
          statut: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["cultures"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["cultures"]["Insert"]>;
      };
      stocks: {
        Row: {
          id: string;
          produit: string;
          categorie: string;
          quantite: number;
          unite: string;
          seuil_critique: number;
          entrepot: string;
          valeur: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["stocks"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["stocks"]["Insert"]>;
      };
      commandes: {
        Row: {
          id: string;
          client: string;
          produit: string;
          quantite: number;
          prix_unitaire: number;
          total: number;
          statut: string;
          date_commande: string;
          date_livraison: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["commandes"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["commandes"]["Insert"]>;
      };
      employes: {
        Row: {
          id: string;
          nom: string;
          prenom: string;
          poste: string;
          type_contrat: string;
          salaire_base: number;
          date_embauche: string;
          zone: string;
          telephone: string | null;
          email: string | null;
          actif: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["employes"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["employes"]["Insert"]>;
      };
      parcelles: {
        Row: {
          id: string;
          code: string;
          localite: string;
          culture: string;
          surface: number;
          sol: string;
          propriete: string;
          gps_lat: number | null;
          gps_lng: number | null;
          statut: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["parcelles"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["parcelles"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
