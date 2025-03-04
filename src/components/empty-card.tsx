'use client'
import { sourceCodePro400 } from '@/styles/fonts';
import { Card } from './ui/glare-card';
import { redirect } from 'next/navigation'


const EmptyCard: React.FC = () => {
    return (
        <Card
            cardCount={1}
            frontCard={true}
            drag="x"
            onPress={() => redirect('/me')}
            setActiveCardKey={undefined}>
            <div className="p-4 flex flex-col">
                <h2 className={`text-3xl ${sourceCodePro400.className}`}>Make A Card Now!</h2>
            </div>
        </Card>
    );
};

export default EmptyCard;