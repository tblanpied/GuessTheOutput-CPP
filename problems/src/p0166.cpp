#include <iostream>

int main()
{
    char asChar{ '5' };
    char asInt{ 5 };

    char a1{ 97 };
    char a2{ 'a' };

    std::cout << asChar << ' ' << static_cast<int>(asChar) << '\n';
    std::cout << static_cast<int>(asInt) << '\n';
    std::cout << a1 << a2 << '\n';

    return 0;
}
