CREATE TABLE public.contact_inquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 40 AND phone ~ '^[0-9+() .-]*$'),
 service text NOT NULL CHECK (service IN ('Pilotes', 'Submuraciones', 'Estudios de suelos', 'Consulta general')),
 message text NOT NULL CHECK (char_length(trim(message)) BETWEEN 10 AND 2000)
);
GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit inquiries" ON public.contact_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);