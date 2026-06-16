import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ManageHeroRequest {
  action: 'create' | 'delete' | 'toggle';
  adminToken: string;
  id?: string;
  data?: {
    page?: string;
    title?: string;
    subtitle?: string;
    cta_text?: string;
    cta_link?: string;
    background_image?: string;
    is_active?: boolean;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { action, adminToken, id, data }: ManageHeroRequest = await req.json();

    if (!adminToken) {
      return new Response(
        JSON.stringify({ error: "Admin authentication required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let result;
    let error;

    switch (action) {
      case 'create':
        if (!data) {
          return new Response(
            JSON.stringify({ error: "Data is required for create action" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        ({ data: result, error } = await supabase
          .from("hero_sections")
          .insert([data])
          .select()
          .single());
        break;

      case 'delete':
        if (!id) {
          return new Response(
            JSON.stringify({ error: "ID is required for delete action" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        ({ error } = await supabase
          .from("hero_sections")
          .delete()
          .eq("id", id));
        result = { deleted: true };
        break;

      case 'toggle':
        if (!id) {
          return new Response(
            JSON.stringify({ error: "ID is required for toggle action" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        const { data: currentHero } = await supabase
          .from("hero_sections")
          .select("is_active")
          .eq("id", id)
          .single();

        if (currentHero) {
          ({ data: result, error } = await supabase
            .from("hero_sections")
            .update({ is_active: !currentHero.is_active })
            .eq("id", id)
            .select()
            .single());
        }
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
