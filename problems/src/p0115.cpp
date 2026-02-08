#include <iostream>

#define FLAG 0

int main()
{
#ifdef FLAG
    std::cout << "A\n";
#endif

#if FLAG
    std::cout << "B\n";
#else
    std::cout << "C\n";
#endif

    return 0;
}
