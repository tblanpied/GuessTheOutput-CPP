#include <iostream>

int main()
{
    signed char sc{ -1 };
    unsigned char uc{ 255 };

    char plain{ 'A' };

    std::cout << static_cast<int>(sc) << ' ' << static_cast<int>(uc) << '\n';
    std::cout << plain << ' ' << static_cast<int>(plain) << '\n';

    return 0;
}
