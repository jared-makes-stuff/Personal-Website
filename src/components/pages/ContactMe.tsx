import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { SectionTitle } from '../ui/SectionTitle';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import type { ContactData } from '../../types/site';
import { normalizeExternalUrl } from '../../utils/urls';

interface ContactMeProps {
  data: ContactData;
}

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, '');

export function ContactMe({ data }: ContactMeProps) {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: data.email,
      href: data.email ? `mailto:${data.email}` : '',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.phone,
      href: data.phone ? `tel:${normalizePhone(data.phone)}` : '',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data.location,
      href: normalizeExternalUrl(data.locationUrl) || '',
    },
  ].filter((info) => info.value);

  return (
    <section
      id="contact"
      data-section-title={data.title}
      className="section-block min-h-screen flex items-center justify-center py-20"
    >
      <div className="section-content max-w-6xl mx-auto px-6 w-full">
        <SectionTitle title={data.title} className="mb-4" />
        <p className="section-intro text-muted-foreground mb-12">{data.intro}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="subsection-title mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">{info.label}</div>
                      <div className="group-hover:text-primary transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </>
                );
                return (
                  <Card key={info.label} className="p-4">
                    {info.href ? (
                      <a href={info.href} className="flex items-start gap-4 group">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 group">{content}</div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="p-6">
            <h2 className="subsection-title mb-6">{data.formTitle}</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Your message..." 
                  className="mt-2 min-h-[150px]"
                />
              </div>
              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
