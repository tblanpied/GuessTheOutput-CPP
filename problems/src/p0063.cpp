#include <iostream>

int five()
{
    return 5;
}

int main()
{
    int a{ 2 };
    int b{ a + 3 };
    int c{ (b + five()) * 2 };

    std::cout << b << '\n';
    std::cout << c << '\n';

    return 0;
}
